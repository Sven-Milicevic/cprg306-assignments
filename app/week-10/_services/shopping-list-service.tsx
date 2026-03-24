import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

// Define the Item type
export interface ItemType {
  id?: string;
  name: string;
  quantity: number;
  category: string;
}

// Get all items for a specific user
export async function getItems(userId: string): Promise<ItemType[]> {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const q = query(itemsRef);
    const snapshot = await getDocs(q);

    const items: ItemType[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ItemType, "id">),
    }));

    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

// Add a new item for a specific user
export async function addItem(userId: string, item: Omit<ItemType, "id">): Promise<string | null> {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsRef, item);
    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
}