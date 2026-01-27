import React from "react";

interface ItemType {
  name: string;
  quantity: number;
  category: string;
}

// Array of items
const items: ItemType[] = [
  { name: "milk, 4 L 🥛", quantity: 1, category: "dairy" },
  { name: "bread 🍞", quantity: 2, category: "bakery" },
  { name: "eggs, dozen 🥚", quantity: 2, category: "dairy" },
  { name: "bananas 🍌", quantity: 6, category: "produce" },
  { name: "broccoli 🥦", quantity: 3, category: "produce" },
  { name: "chicken breasts, 1 kg 🍗", quantity: 1, category: "meat" },
  { name: "pasta sauce 🍝", quantity: 3, category: "canned goods" },
  { name: "spaghetti, 454 g 🍝", quantity: 2, category: "dry goods" },
  { name: "toilet paper, 12 pack 🧻", quantity: 1, category: "household" },
  { name: "paper towels, 6 pack", quantity: 1, category: "household" },
  { name: "dish soap 🍽️", quantity: 1, category: "household" },
  { name: "hand soap 🧼", quantity: 4, category: "household" },
];

// Functional Component
const ItemList: React.FC = () => {
  return (
    <ul className="max-w-md mx-auto space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex justify-between bg-white shadow rounded-md p-3"
        >
          <div>
            <p className="font-semibold text-gray-800">{item.name}</p>
            <p className="text-gray-500 text-sm">{item.category}</p>
          </div>
          <span className="text-gray-700 font-medium">{item.quantity}</span>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
