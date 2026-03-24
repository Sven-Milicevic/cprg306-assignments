"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import NewItem from "./newItem";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { getItems, addItem, ItemType } from "../_services/shopping-list-service";

export default function ShoppingListPage() {
  const router = useRouter();
  const { user, firebaseSignOut, loading } = useUserAuth();
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  // Redirect if not logged in (after loading finishes)
  useEffect(() => {
    if (!loading && !user) {
      router.push("/week-8/access-denied");
    }
  }, [user, loading, router]);

  // Load items from Firestore for the current user
  const loadItems = async () => {
    if (!user) return; // safety check
    const fetchedItems = await getItems(user.uid);
    setItems(fetchedItems);
  };

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]); // only run when user is available

  // Add a new item
  const handleAddItem = async (item: Omit<ItemType, "id">) => {
    if (!user) return;
    const newItemId = await addItem(user.uid, item);
    if (newItemId) {
      const newItem: ItemType = { ...item, id: newItemId };
      setItems((prev) => [...prev, newItem]);
    } else {
      console.error("Failed to add item to Firestore");
    }
  };

  // Select an item for meal ideas
  const handleItemSelect = (item: ItemType) => {
    const cleanedName = item.name
      .split(",")[0]
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      )
      .trim();
    setSelectedItemName(cleanedName);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await firebaseSignOut();
      router.push("/week-8"); // redirect to landing page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Show a loading message while checking authentication
  if (loading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-[#0b0c24]">
        <p className="text-cyan-400 text-lg animate-pulse">
          Checking authentication...
        </p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen p-6 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(11,12,36,0.85),rgba(11,12,36,0.85)),url('/week-6/cbgrocer.jpg')",
      }}
    >
      <div className="flex flex-col items-center pt-8 pb-8 space-y-6">
        {/* Header with Logout */}
        <div className="flex justify-between items-center w-full max-w-5xl mb-6">
          <h1 className="text-4xl font-extrabold text-pink-400 neon-flicker-pink">
            My Shopping List
          </h1>
          <button
            onClick={handleLogout}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg shadow-[0_0_15px_#ff2be6] transition"
          >
            Logout
          </button>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl items-start justify-center">
          {/* Left: Add Item + List */}
          <div className="flex flex-col items-center gap-6 w-full lg:w-1/2">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>

          {/* Right: Meal Ideas */}
          <div className="w-full lg:w-1/2">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}