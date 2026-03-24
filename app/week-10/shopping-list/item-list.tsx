"use client";

import React, { useState } from "react";
import Item from "./items";
import { ItemType } from "../_services/shopping-list-service"

interface ItemListProps {
  items: ItemType[];
  onItemSelect: (item: ItemType) => void;
}

type SortOption = "name" | "category" | "grouped";

const ItemList: React.FC<ItemListProps> = ({ items, onItemSelect }) => {
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const sortedItems = [...items].sort((a, b) =>
    sortBy === "name"
      ? a.name.localeCompare(b.name)
      : sortBy === "category"
      ? a.category.localeCompare(b.category)
      : 0
  );

  const groupedItems: [string, ItemType[]][] =
    sortBy === "grouped"
      ? Object.entries(
          items.reduce<Record<string, ItemType[]>>((acc, item) => {
            (acc[item.category] ||= []).push(item);
            return acc;
          }, {})
        )
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([cat, arr]) => [
            cat,
            [...arr].sort((a, b) => a.name.localeCompare(b.name)),
          ])
      : [];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Sort Buttons */}
      <div className="flex justify-center gap-3 mb-4">
        {["name", "category", "grouped"].map((opt) => (
          <button
            key={opt}
            onClick={() => setSortBy(opt as SortOption)}
            className={`px-4 py-2 rounded-md border border-purple-700 text-white transition-colors ${
              sortBy === opt
                ? "bg-pink-600 shadow-[0_0_15px_#ff2be6]"
                : "bg-[#1b1e3f] hover:bg-[#272b5a]"
            }`}
          >
            {opt === "name"
              ? "Sort by Name"
              : opt === "category"
              ? "Sort by Category"
              : "Group by Category"}
          </button>
        ))}
      </div>

      {/* Items */}
      <ul className="bg-[#131637]/90 rounded-lg glow-pulse-cyan p-4 border border-cyan-500">
        {sortBy === "grouped"
          ? groupedItems.map(([category, group], i) => (
              <li
                key={category}
                className={`mb-4 p-3 rounded-lg border ${
                  i % 2 === 0 ? "bg-[#1b1e3f]" : "bg-[#272b5a]"
                } border-purple-700`}
              >
                <h2 className="font-bold text-lg text-pink-400 capitalize mb-2 border-b pb-1 border-purple-700">
                  {category}
                </h2>
                <ul className="mt-2 space-y-1">
                  {group.map((item) => (
                    <Item
                      key={item.id}
                      {...item}
                      onSelect={() => onItemSelect(item)}
                    />
                  ))}
                </ul>
              </li>
            ))
          : sortedItems.map((item) => (
              <Item
                key={item.id}
                {...item}
                onSelect={() => onItemSelect(item)}
              />
            ))}
      </ul>
    </div>
  );
};

export default ItemList;