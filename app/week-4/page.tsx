import React from "react";
import NewItem from "./newItem";

export default function Page() {
  return (
    <main 
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/week-4/galaxy.jpeg')"
      }}
    >
    {/*Background Shadow*/}
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Add New Item</h1>
      <NewItem />  
    </main>
  );
}


