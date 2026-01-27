import React from "react";

interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}


const Item: React.FC<ItemProps> = ({ name, quantity, category }) => {
  return (
    <li className="bg-white shadow-md rounded-md p-4 mb-2 flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-gray-500 text-sm">{category}</p>
      </div>
      <span className="text-gray-700 font-medium">{quantity}</span>
    </li>
  );
};

export default Item;
