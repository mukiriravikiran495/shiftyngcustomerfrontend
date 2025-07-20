import React, { createContext, useContext, useState, ReactNode } from "react";

export type SelectedItem = {
  id: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
};

type ItemContextType = {
  selectedItems: SelectedItem[];
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  return (
    <ItemContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error("useItemContext must be used within ItemProvider");
  return context;
};
