import type { AIRecipeRequest, GeneratedRecipe } from "../models/AIRecipeModels";


const API_URL = "http://localhost:8082/ai";

export async function generateRecipe(
    request: AIRecipeRequest
): Promise<GeneratedRecipe> {

    // const token = localStorage.getItem("authToken");

    const response = await fetch(
        `${API_URL}/generate-recipe`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(request)
        }
    );

    if (!response.ok) {
        throw new Error("Recipe generation failed");
    }

    return response.json();
}