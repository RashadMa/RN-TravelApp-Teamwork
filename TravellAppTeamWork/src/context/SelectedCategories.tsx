import React, { createContext, useState } from 'react';
import { Category } from '../interfaces/Category';

export const SelectedCategoriesContext = createContext<any>(null);

export const SelectedCategoriesProvider = ({ children }: any) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const addCategory = (category: Category) => {
    if (selectedCategories.length < 2) {
      setSelectedCategories(prevCategories => [...prevCategories, category]);
    }
  };

  const removeCategory = (category: Category) => {
    setSelectedCategories(prevCategories => prevCategories.filter(q => q.id !== category.id));
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <SelectedCategoriesContext.Provider
      value={{
        selectedCategories,
        addCategory,
        removeCategory,
        clearCategories
      }}
    >
      {children}
    </SelectedCategoriesContext.Provider>
  );
};
