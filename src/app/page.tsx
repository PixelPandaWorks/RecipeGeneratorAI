"use client";

import React, { useState } from "react";
import { ChefHat, Loader2, Utensils } from "lucide-react";
import { generateRecipes } from "./controller";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateRecipes = async () => {
    if (!ingredients.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error(
          "API key not configured. Please check your environment variables."
        );
      }

      const result = await generateRecipes(ingredients);
      setRecipes(result);
    } catch (error: unknown) {
      let errorMessage = "Failed to generate recipes. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          errorMessage =
            "API key configuration error. Please check the setup instructions.";
        }
      }
      setError(errorMessage);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-orange-500 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">AI Recipe Generator</h1>
          <nav className="space-x-4">
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a href="#examples" className="hover:underline">
              Examples
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <ChefHat className="h-16 w-16 text-orange-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Recipe Generator
            </h1>
            <p className="text-lg text-gray-600">
              Transform your ingredients into delicious recipes
            </p>
          </section>
          {/* Input Section */}
          <section className="bg-white rounded-lg shadow-xl p-6 mb-12">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                What ingredients do you have?
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients separated by commas (e.g., chicken, rice, tomatoes, onions)"
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
              <button
                onClick={handleGenerateRecipes}
                disabled={isLoading || !ingredients.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating Recipes...
                  </>
                ) : (
                  <>
                    <Utensils className="h-5 w-5" />
                    Generate Recipes
                  </>
                )}
              </button>
            </div>
          </section>
          {/* Recipes Section */}
          {recipes && (
            <section className="bg-gray-50 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Your Recipes
              </h2>
              <div className="space-y-6">
                {recipes.split("\n\n").map((recipe, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <ReactMarkdown className="prose prose-orange">
                      {recipe}
                    </ReactMarkdown>
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Examples Section */}
          <section
            id="examples"
            className="bg-gray-50 rounded-lg shadow-xl p-6 mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              How It Works
            </h2>
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    Add the ingredients you have at home
                  </h3>
                  <p className="text-gray-600">
                    Start by listing the ingredients you have in your kitchen,
                    such as:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>Water</li>
                    <li>Milk</li>
                    <li>Butter</li>
                    <li>Eggs</li>
                  </ul>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    Get recipes based on your ingredients
                  </h3>
                  <p className="text-gray-600">
                    The AI will suggest recipes tailored to the ingredients you
                    provide. Here are some examples:
                  </p>
                  {/* Example 1 */}
                  <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Classic Scrambled Eggs
                    </h4>
                    <p className="text-sm text-gray-600 italic">
                      Ingredients: Eggs, Milk, Butter, Salt
                    </p>
                    <h5 className="font-semibold mt-3 text-gray-700">
                      Directions:
                    </h5>
                    <ul className="list-decimal list-inside text-gray-600 mt-2 space-y-2">
                      <li>
                        Beat eggs, milk, salt, and pepper thoroughly with a fork
                        or wire whisk until well mixed.
                      </li>
                      <li>
                        Heat butter in a 10-inch skillet over medium heat until
                        butter begins to sizzle.
                      </li>
                      <li>
                        Pour egg mixture into skillet. As it begins to set,
                        gently lift the cooked portions with a spatula to let
                        uncooked portions flow to the bottom.
                      </li>
                      <li>
                        Cook for 3 to 4 minutes or until eggs are thickened
                        throughout but still moist.
                      </li>
                    </ul>
                  </div>
                  {/* Example 2 */}
                  <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Quick Butter Pancakes
                    </h4>
                    <p className="text-sm text-gray-600 italic">
                      Ingredients: Flour, Milk, Butter, Sugar
                    </p>
                    <h5 className="font-semibold mt-3 text-gray-700">
                      Directions:
                    </h5>
                    <ul className="list-decimal list-inside text-gray-600 mt-2 space-y-2">
                      <li>
                        In a bowl, mix flour, sugar, and a pinch of salt.
                        Gradually whisk in milk until smooth.
                      </li>
                      <li>Melt butter in a non-stick pan over medium heat.</li>
                      <li>
                        Pour a ladle of batter into the pan and spread evenly.
                        Cook until bubbles form on the surface, then flip and
                        cook the other side.
                      </li>
                      <li>Serve hot with syrup or your favorite toppings.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-8">
              {error}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            © 2024 AI Recipe Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
