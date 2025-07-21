import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define your item type (adjust as per your data)
export type Item = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  category: string;
};

type ItemContextType = {
  selectedItems: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>(() => {
    // 👇 Load from localStorage on first load
    const stored = localStorage.getItem("selectedItems");
    return stored ? JSON.parse(stored) : [];
  });

  // 👇 Save to localStorage whenever selectedItems changes
  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  return (
    <ItemContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
