"use client";
import React, { useState } from "react";

export default function NewItem() {   
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState<string>("produce");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const item = { name, quantity, category };
    console.log("New item:", item);
    alert(`Item: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-950 shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
    >
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
          Item Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter item name"
        />
      </div>

      {/* Quantity with +/- Buttons */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={decrement}
            className="bg-red-200 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            -
          </button>
          <span className="text-xl font-semibold w-12 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={increment}
            className="bg-blue-200 hover:bg-blue-300 text-black font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            +
          </button>
        </div>
      </div>

     {/* Category Select */}
<div>
  <label htmlFor="category" className="block text-sm font-medium text-white mb-1">
    Category
  </label>
  <select
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
  >
    <option value="produce" className="text-gray-900">Produce</option>
    <option value="dairy" className="text-gray-900">Dairy</option>
    <option value="bakery" className="text-gray-900">Bakery</option>
    <option value="meat" className="text-gray-900">Meat</option>
    <option value="frozen" className="text-gray-900">Frozen Foods</option>
    <option value="canned" className="text-gray-900">Canned Goods</option>
    <option value="dry" className="text-gray-900">Dry Goods</option>
    <option value="beverages" className="text-gray-900">Beverages</option>
    <option value="snacks" className="text-gray-900">Snacks</option>
    <option value="household" className="text-gray-900">Household</option>
    <option value="other" className="text-gray-900">Other</option>
  </select>
</div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Add Item
      </button>
    </form>
  );
}