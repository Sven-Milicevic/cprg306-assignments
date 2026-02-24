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
    const newItem: ItemType = { ...item, id: crypto.randomUUID() };
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <main
      className="min-h-screen p-6 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(11,12,36,0.85),rgba(11,12,36,0.85)),url('/week-6/cbgrocer.jpg')",
      }}
    >
      <div className="flex flex-col items-center pt-8 pb-8 space-y-10">
        <h1 className="text-4xl font-extrabold text-pink-400 drop-shadow-[0_0_10px_#ff2be6]">
          Shopping List
        </h1>

        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}