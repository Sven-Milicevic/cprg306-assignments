"use client";

import React, { useState } from "react";

interface NewItemProps {
  onAddItem: (item: { name: string; quantity: number; category: string }) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || name.trim().length < 2) {
      alert("Please enter a valid item name (at least 2 characters).");
      return;
    }
    onAddItem({ name, quantity, category });
    setName(""); setQuantity(1); setCategory("produce"); setNameTouched(false);
  };

  const increment = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#131637]/90 shadow-[0_0_20px_#ff2be6] rounded-2xl p-6 w-full max-w-md space-y-4 border border-purple-700"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-cyan-400 mb-1">
          Item Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          required
          className={`w-full px-3 py-2 border text-white placeholder-gray-400 bg-[#1b1e3f] ${
            nameTouched && (!name || name.trim().length < 2)
              ? "border-pink-500"
              : "border-cyan-400"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
          placeholder="Enter item name"
        />
        {nameTouched && (!name || name.trim().length < 2) && (
          <p className="text-pink-400 text-sm mt-1">Please enter at least 2 characters</p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-cyan-400 mb-1">Quantity</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={decrement}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg shadow-[0_0_10px_#ff2be6]"
          >
            −
          </button>
          <span className="text-xl font-semibold w-12 text-center text-cyan-300">{quantity}</span>
          <button
            type="button"
            onClick={increment}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg shadow-[0_0_10px_#00f0ff]"
          >
            +
          </button>
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-cyan-400 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-cyan-400 bg-[#1b1e3f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!name || name.trim().length < 2}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-[0_0_20px_#ff2be6] disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Add Item
      </button>
    </form>
  );
}