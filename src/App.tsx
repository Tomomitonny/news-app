import React, { useState, useEffect } from 'react';
import './index.css';


const NewsApp: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(data => {
        // 取得した記事IDの配列を元に、各記事の詳細を取得
        const articleRequests = data.slice(0, 10).map((id: number) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.json())
        );

        Promise.all(articleRequests).then(articles => {
          setArticles(articles);
        });
      });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm(''); // カテゴリー変更時に検索欄をクリアする
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || article.category === selectedCategory) // カテゴリーが選択されていないか、記事のカテゴリーが選択されたカテゴリーと一致する場合に表示
  );

  return (
    <div>
      <h1
        className='m-20'
        >ニュース一覧</h1>
      <input
        type="text"
        placeholder="記事を検索する"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        <button onClick={() => handleCategoryChange('')}>すべて</button>
        <button onClick={() => handleCategoryChange('ask')}>テクノロジー</button>
        <button onClick={() => handleCategoryChange('show')}>スポーツ</button>
        {/* 他のカテゴリーボタンも同様に追加 */}
      </div>
      <ul>
        {filteredArticles.map((article: any) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            {article.url && <a href={article.url} target="_blank" rel="noopener noreferrer">リンクを開く</a>}
            {article.urlToImage ? (
              <img src={article.urlToImage} alt="記事の画像" />
            ) : (
              <img src="https://via.placeholder.com/150" alt="デモ画像" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsApp;
