import React from "react";
import ItemList from "./item-list";

const Page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-start p-6">
      {/* Blurred background */}
      <div 
        className="
          absolute inset-0 -z-10
          bg-[url('/week-3/grocerystock.jpg')] 
          bg-cover bg-center
          blur-sm
        "
      />
      
      {/* Content */}
      <h1 className="text-4xl font-bold text-red-800 mt-6 mb-6 drop-shadow-lg">
        Shopping List
      </h1>
      <div className="bg-white bg-opacity-80 rounded-lg p-4 w-full max-w-xl shadow-lg">
        <ItemList />
      </div>
    </main>
  );
};

export default Page;
