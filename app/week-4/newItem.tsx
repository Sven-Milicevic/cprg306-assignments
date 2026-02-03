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
    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="produce">Produce</option>
    <option value="dairy">Dairy</option>
    <option value="bakery">Bakery</option>
    <option value="meat">Meat</option>
    <option value="frozen">Frozen Foods</option>
    <option value="canned">Canned Goods</option>
    <option value="dry">Dry Goods</option>
    <option value="beverages">Beverages</option>
    <option value="snacks">Snacks</option>
    <option value="household">Household</option>
    <option value="other">Other</option>
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