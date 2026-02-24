import React from "react";

interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

const Item: React.FC<ItemProps> = ({ name, quantity, category }) => {
  return (
    <li className="flex justify-between items-center border-b border-gray-200 py-2">
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
      <span className="text-gray-700 font-medium">{quantity}</span>
    </li>
  );
};

export default Item;