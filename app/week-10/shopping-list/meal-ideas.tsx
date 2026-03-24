"use client";

import { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealDetail {
  ingredients: { name: string; measure: string }[];
}

interface MealIdeasProps {
  ingredient: string;
}

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.meals ?? [];
  } catch (error) {
    console.error("Failed to fetch meal ideas:", error);
    return [];
  }
}

async function fetchMealDetail(idMeal: string): Promise<MealDetail> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    const meal = data.meals[0];

    const ingredients = Array.from({ length: 20 }, (_, i) => ({
      name: meal[`strIngredient${i + 1}`] as string,
      measure: meal[`strMeasure${i + 1}`] as string,
    })).filter(({ name }) => name && name.trim() !== "");

    return { ingredients };
  } catch (error) {
    console.error("Failed to fetch meal detail:", error);
    return { ingredients: [] };
  }
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mealDetails, setMealDetails] = useState<Record<string, MealDetail>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function loadMealIdeas() {
    setMeals([]);
    setExpandedId(null);
    setMealDetails({});
    const result = await fetchMealIdeas(ingredient);
    setMeals(result);
  }

  useEffect(() => {
    if (ingredient) loadMealIdeas();
  }, [ingredient]);

  async function handleToggle(meal: Meal) {
    // Collapse if already expanded
    if (expandedId === meal.idMeal) {
      setExpandedId(null);
      return;
    }

    setExpandedId(meal.idMeal);

    // Fetch details only if not already cached
    if (!mealDetails[meal.idMeal]) {
      setLoadingId(meal.idMeal);
      const detail = await fetchMealDetail(meal.idMeal);
      setMealDetails((prev) => ({ ...prev, [meal.idMeal]: detail }));
      setLoadingId(null);
    }
  }

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
          No meal ideas found for{" "}
          <span className="text-pink-400 font-semibold">{ingredient}</span>.
        </p>
      ) : (
        <>
          <p className="text-cyan-400 text-center mb-3">
            Showing meals with{" "}
            <span className="text-pink-400 font-semibold">{ingredient}</span>:
          </p>
          <ul className="bg-[#131637]/90 rounded-lg glow-pulse-cyan p-4 border border-cyan-500 space-y-3">
            {meals.map((meal) => {
              const isExpanded = expandedId === meal.idMeal;
              const isLoading = loadingId === meal.idMeal;
              const detail = mealDetails[meal.idMeal];

              return (
                <li
                  key={meal.idMeal}
                  className="border-b border-purple-700 pb-3 last:border-b-0 last:pb-0"
                >
                  {/* Meal row — click to toggle */}
                  <button
                    onClick={() => handleToggle(meal)}
                    className="flex items-center gap-3 w-full text-left hover:bg-[#272b5a] rounded-lg px-2 py-1 transition-colors"
                  >
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-14 h-14 rounded-lg object-cover shadow-[0_0_8px_#ff2be6] shrink-0"
                    />
                    <p className="text-cyan-300 font-medium flex-1">{meal.strMeal}</p>
                    <span className="text-pink-400 text-lg">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Expanded ingredients */}
                  {isExpanded && (
                    <div className="mt-2 ml-2 pl-3 border-l-2 border-pink-500">
                      {isLoading ? (
                        <p className="text-cyan-400 text-sm">Loading ingredients...</p>
                      ) : detail ? (
                        <>
                          <p className="text-pink-400 text-sm font-semibold mb-1">
                            Ingredients:
                          </p>
                          <ul className="space-y-1">
                            {detail.ingredients.map(({ name, measure }, i) => (
                              <li key={i} className="flex justify-between text-sm">
                                <span className="text-cyan-300">{name}</span>
                                <span className="text-gray-400">{measure.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}