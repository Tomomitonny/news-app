import React from 'react';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories = ['トップ', 'おすすめ', '天気', '政治', 'ビジネス', 'スポーツ', '文化'];

  return (
    <div>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          style={{ fontWeight: selectedCategory === category ? 'bold' : 'normal' }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
