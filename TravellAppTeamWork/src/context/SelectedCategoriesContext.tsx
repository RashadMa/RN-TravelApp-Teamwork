import { createContext, useState } from "react";

interface SelectedCategoriesProviderProps {
  selectedCategories: any[]
  setSelectedCategories(item: any): void
}

export const SelectedCategoriesContext = createContext<SelectedCategoriesProviderProps>({
  selectedCategories: [],
  setSelectedCategories: () => { }
});

export const SelectedCategoriesProvider = ({ children }: any) => {
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  const values: SelectedCategoriesProviderProps = {
    selectedCategories,
    setSelectedCategories
  }
  return (
    <SelectedCategoriesContext.Provider value={values}>
      {children}
    </SelectedCategoriesContext.Provider>
  )
}