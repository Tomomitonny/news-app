import React from 'react';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories = ['TOP', 'NEW', 'BEST'];

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
