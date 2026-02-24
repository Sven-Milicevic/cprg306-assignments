"use client";

import React, { useState } from "react";
import NewItem from "./newItem";
import ItemList from "./item-list";
import itemsData from "./items.json";

interface ItemType {
  id: string; 
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData);

  const handleAddItem = (item: Omit<ItemType, "id">) => {
    const newItem: ItemType = {
      ...item,
      id: crypto.randomUUID(),
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <main
      className="min-h-screen p-6 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/week-5/market.jpeg')",
      }}
    >
      <div className="flex flex-col items-center pt-8 pb-8 space-y-8">
        <h1 className="text-3xl font-bold mb-2 text-green-400">
          Shopping List
        </h1>

        {/* Form for adding new items */}
        <NewItem onAddItem={handleAddItem} />

        {/* Display list of items */}
        <ItemList items={items} />
      </div>
    </main>
  );
}