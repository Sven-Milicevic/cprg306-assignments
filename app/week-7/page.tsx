"use client";

import React, { useState } from "react";
import NewItem from "./newItem";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

function cleanItemName(name: string): string {
  return name
    .split(",")[0]
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, "")
    .trim();
}

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  const handleAddItem = (item: Omit<ItemType, "id">) => {
    const newItem: ItemType = { ...item, id: crypto.randomUUID() };
    setItems((prev) => [...prev, newItem]);
  };

  const handleItemSelect = (item: ItemType) => {
    setSelectedItemName(cleanItemName(item.name));
  };

  return (
    <main
      className="min-h-screen p-6 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(11,12,36,0.85),rgba(11,12,36,0.85)),url('/week-6/cbgrocer.jpg')",
      }}
    >
      <div className="flex flex-col items-center pt-8 pb-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-pink-400 neon-flicker-pink">
          Shopping List
        </h1>

        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl items-start justify-center">
          {/* Left: Add Item + List */}
          <div className="flex flex-col items-center gap-6 w-full lg:w-1/2">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>

          {/* Right: Meal Ideas */}
          <div className="w-full lg:w-1/2">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}