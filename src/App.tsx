import React, { useState } from 'react';
import CategorySelector from './components/CategorySelector.tsx';
import NewsList from './components/NewsList.tsx';


const App: React.FC = () => {
  const [category, setCategory] = useState<string>('TOP');
  const [keyword, setKeyword] = useState<string>('');

  return (
    <div>
      <h1>ニュースアプリ</h1>
      <CategorySelector selectedCategory={category} onSelectCategory={setCategory} />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="キーワードを入力"
      />
      <NewsList category={category} keyword={keyword} />
    </div>
  );
};

export default App;