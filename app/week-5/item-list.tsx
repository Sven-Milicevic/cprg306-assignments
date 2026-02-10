"use client";

import React, { useState } from "react";
import Item from "./items";
import itemsData from "./items.json";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

type SortOption = "name" | "category" | "grouped";

const ItemList: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>("name");

  // Sort alphabetically by name or category
  const sortedItems = [...itemsData].sort((a: ItemType, b: ItemType) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  // Group items by category if sortBy === "grouped"
  const groupedItems: [string, ItemType[]][] =
    sortBy === "grouped"
      ? Object.entries(
          itemsData.reduce<Record<string, ItemType[]>>((acc, item) => {
            const category = item.category;
            if (!acc[category]) acc[category] = [];
            acc[category].push(item);
            return acc;
          }, {})
        )
          // Sort categories alphabetically
          .sort(([a], [b]) => a.localeCompare(b))
          // Sort items within each category alphabetically by name
          .map(
            ([category, items]) =>
              [category, items.sort((a, b) => a.name.localeCompare(b.name))] as [
                string,
                ItemType[]
              ]
          )
      : [];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Sort Buttons */}
      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded-md border transition-colors ${
            sortBy === "name"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded-md border transition-colors ${
            sortBy === "category"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Sort by Category
        </button>

        <button
          onClick={() => setSortBy("grouped")}
          className={`px-4 py-2 rounded-md border transition-colors ${
            sortBy === "grouped"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Group by Category
        </button>
      </div>

      {/* Render Items */}
      <ul className="bg-white rounded-lg shadow-md p-4">
        {sortBy === "grouped" ? (
          groupedItems.map(([category, items], index) => (
            <li
              key={category}
              className={`mb-4 p-3 rounded-lg border transition-colors ${
                index % 2 === 0
                  ? "bg-gray-50 border-gray-200"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <h2 className="font-bold text-lg text-gray-700 capitalize mb-2 border-b pb-1 border-gray-300">
                {category}
              </h2>
              <ul className="mt-2 space-y-1">
                {items.map((item: ItemType) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </li>
          ))
        ) : (
          sortedItems.map((item: ItemType) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;