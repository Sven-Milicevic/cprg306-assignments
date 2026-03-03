"use client";

import { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealIdeasProps {
  ingredient: string;
}

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await res.json();
  return data.meals ?? [];
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMealIdeas() {
    const result = await fetchMealIdeas(ingredient);
    setMeals(result);
  }

  useEffect(() => {
    if (ingredient) loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-pink-400 drop-shadow-[0_0_10px_#ff2be6] mb-4 text-center">
        🍽️ Meal Ideas
      </h2>

      {!ingredient ? (
        <p className="text-cyan-400 text-center">
          Select an item from your list to see meal ideas.
        </p>
      ) : meals.length === 0 ? (
        <p className="text-cyan-400 text-center">
          No meal ideas found for <span className="text-pink-400 font-semibold">{ingredient}</span>.
        </p>
      ) : (
        <>
          <p className="text-cyan-400 text-center mb-3">
            Showing meals with{" "}
            <span className="text-pink-400 font-semibold">{ingredient}</span>:
          </p>
          <ul className="bg-[#131637]/90 rounded-lg shadow-[0_0_20px_#00f0ff] p-4 border border-cyan-500 space-y-3">
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className="flex items-center gap-3 border-b border-purple-700 pb-3 last:border-b-0 last:pb-0"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-14 h-14 rounded-lg object-cover shadow-[0_0_8px_#ff2be6]"
                />
                <p className="text-cyan-300 font-medium">{meal.strMeal}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}