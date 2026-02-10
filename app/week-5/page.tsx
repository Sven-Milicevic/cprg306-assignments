import React from "react";
import NewItem from "./item-list";

export default function Page() {
  return (
    <main 
      className="min-h-screen p-6 bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/week-5/market.jpeg')"
      }}
    >
      <div className="flex flex-col items-center pt-8 pb-8">
        <h1 className="text-3xl font-bold mb-6 text-green-400">Shopping List</h1>
        <NewItem />
      </div>
    </main>
  );
}