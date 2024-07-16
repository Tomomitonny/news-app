import React, { useEffect, useState } from 'react';
import { NewsItem } from '../types/news';

interface NewsListProps {
  category: string;
  keyword: string;
}

const NewsList: React.FC<NewsListProps> = ({ category }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const categoryMap: { [key: string]: string } = {
        トップ: 'topstories',
        おすすめ: 'beststories',
        天気: 'weather',
        政治: 'politics',
        ビジネス: 'business',
        スポーツ: 'sports',
        文化: 'culture',
      };
      try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/${categoryMap[category]}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const newsIds = await response.json();
        const newsIdsSlice = newsIds.slice(0, 10); // 最初の10件を取得
        const newsPromises = newsIdsSlice.map(id => 
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
        );
        const newsResults = await Promise.all(newsPromises);
        setNewsItems(newsResults);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {newsItems.map(news => (
        <li key={news.id}>
          <a href={news.url} target="_blank" rel="noopener noreferrer">
            {news.title}
          </a>
          <p>by {news.by}</p>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
