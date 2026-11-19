
import { useState } from "react";
import type { AIRecipeRequest, GeneratedRecipe } from "../../models/AIRecipeModels";
import { generateRecipe } from "../../services/aiRecipeService";

import "../AIRecipeGenerator/AIRecipeGenerator.scss"


export function AIRecipeGenerator() {

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [ingredientInput, setIngredientInput] = useState("");

    const [maxCookingTime, setMaxCookingTime] = useState(45);
    const [servings, setServings] = useState(2);
    const [foodCategory, setFoodCategory] = useState("Main Course");
    const [originCountry, setOriginCountry] = useState("")

    const [generatedRecipe, setGeneratedRecipe] =
        useState<GeneratedRecipe | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const addIngredient = () => {
        const ingredient = ingredientInput.trim();

        if (ingredient && !ingredients.includes(ingredient)) {
            setIngredients(prev => [...prev, ingredient]);
            setIngredientInput("");
        }
    };

    const removeIngredient = (ingredient: string) => {
        setIngredients(prev =>
            prev.filter(item => item !== ingredient)
        );
    };

    const handleGenerate = async () => {
        if (ingredients.length === 0) {
            setError("Please add at least one ingredient.");
            return;
        }

        setLoading(true);
        setError("");
        setGeneratedRecipe(null);

        try {
            const request: AIRecipeRequest = {
                ingredients,
                maxCookingTime,
                servings,
                foodCategory,
                originCountry
            };

            const recipe = await generateRecipe(request);
            setGeneratedRecipe(recipe);

        } catch (err) {
            setError("Could not generate recipe. Please try again." + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-recipe-container">

            <div className="ai-generator-header">
                <h1>AI Recipe Generator</h1>
                {/* <p>
                    Have some ingredients but don't know what to cook?
                    Let AI create a recipe for you!
                </p> */}
            </div>
        <div className="ai-generator-content">
            <div className="ai-generator-form">

                <div className="form-group">
                    <label>Ingredients</label>

                    <div className="ingredient-input">
                        <input
                            type="text"
                            placeholder="Add an ingredient..."
                            value={ingredientInput}
                            onChange={(e) =>
                                setIngredientInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addIngredient();
                                }
                            }}
                        />

                        <button type="button" onClick={addIngredient}>
                            Add
                        </button>
                    </div>

                    <div className="ingredient-list">
                        {ingredients.map((ingredient, index) => (
                            <span key={index} className="ingredient-tag">
                                {ingredient}

                                <button
                                    type="button"
                                    onClick={() => removeIngredient(ingredient)}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Maximum cooking time</label>

                    <select
                        value={maxCookingTime}
                        onChange={(e) =>
                            setMaxCookingTime(Number(e.target.value))
                        }
                    >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={45}>45 minutes</option>
                        <option value={60}>60 minutes</option>
                        <option value={90}>90 minutes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Number of servings</label>

                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={servings}
                        onChange={(e) =>
                            setServings(Number(e.target.value))
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Food category</label>

                    <select
                        value={foodCategory}
                        onChange={(e) =>
                            setFoodCategory(e.target.value)
                        }
                    >
                        <option value="Main Course">Main Course</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Snack">Snack</option>
                    </select>
                </div>

                <div className="form-group">
                    <label> Origin Country</label>
                    <input type="text"
                            value={originCountry}
                            onChange={(e) => setOriginCountry(e.target.value)} />
                </div>

                {error && (
                    <p className="error-message">{error}</p>
                )}

                <button
                    className="generate-button"
                    type="button"
                    onClick={handleGenerate}
                    disabled={loading}
                >
                    {loading ? "Generating recipe..." : "Generate Recipe"}
                </button>

            </div>

            {loading && (
                <div className="loading-message">
                    <p>AI is creating your recipe...</p>
                </div>
            )}
        

            {generatedRecipe && (
                <div className="generated-recipe">

                    <div className="recipe-header">
                        <span className="ai-badge">AI Generated</span>

                        <h2>{generatedRecipe.title}</h2>

                        <p>{generatedRecipe.originCountry}</p>
                    </div>

                    <div className="recipe-info">
                        <div>
                            <span>Cooking time</span>
                            <strong>
                                {generatedRecipe.cookTimeMinutes} min
                            </strong>
                        </div>

                        <div>
                            <span>Servings</span>
                            <strong>{generatedRecipe.servings}</strong>
                        </div>

                        <div>
                            <span>Category</span>
                            <strong>{generatedRecipe.foodCategory}</strong>
                        </div>
                    </div>

                    <div className="recipe-content">

                        <section className="recipe-ingredients">
                            <h3>Ingredients</h3>

                            <ul>
                                {generatedRecipe.ingredients.map(
                                    (ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    )
                                )}
                            </ul>
                        </section>

                        <section className="recipe-steps">
                            <h3>Preparation</h3>

                            <ol>
                                {generatedRecipe.recipeSteps.map(
                                    (step, index) => (
                                        <li key={index}>{step}</li>
                                    )
                                )}
                            </ol>
                        </section>

                    </div>

                </div>
            )}
            </div>
        </div>
    );
}
