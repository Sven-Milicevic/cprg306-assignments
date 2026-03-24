import React from "react";

interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
}

const Item: React.FC<ItemProps> = ({ name, quantity, category, onSelect }) => {
  return (
    <li
      onClick={onSelect}
      className="flex justify-between items-center border-b border-gray-200 py-2 cursor-pointer hover:bg-[#272b5a] rounded px-2 transition-colors"
    >
      <div>
        <p className="font-semibold text-cyan-500">{name}</p>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
      <span className="text-gray-700 font-medium">{quantity}</span>
    </li>
  );
};

export default Item;