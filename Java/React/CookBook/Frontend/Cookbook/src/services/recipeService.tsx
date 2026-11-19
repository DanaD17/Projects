import type { Recipe } from "../models/RecipeModel";
import type { CreateRecipeRequest } from "../models/CreateRecipeRequest";
import type { LoginModel,LoginResponse } from "../models/LoginModel";
import type { RegisterModel } from "../models/RegisterModel";
import type { RecipeUpdateRequest } from "../models/RecipeUpdateRequest";


    const apiUrl = "http://localhost:8082/recipes/getRecipes";
    const apiUrl2 = "http://localhost:8082/recipes"
    const API_URL = "http://localhost:8082"
    const token = localStorage.getItem("authToken");

    export async function getAllRecipes(): Promise<Recipe[]>{
        const response = await fetch(apiUrl)

        if(!response.ok){
            throw new Error("Failed to fetch recipes");
        }
        return response.json();
    }

    
export async function addRecipe(recipe: CreateRecipeRequest): Promise<Recipe> {

    const response = await fetch(`${apiUrl2}/addRecipe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(recipe)
    });

    if (!response.ok) {
        throw new Error("Failed to add recipe");
    }

    return await response.json();
}

export const deleteById = async (id:number): Promise<void> => {
    const response = await fetch(`${API_URL}/recipes/deleteById/${id}`,{
        method: "DELETE"
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
            `HTTP ${response.status}: ${errorMessage}`
        );
    }
}



export async function updateRecipe(
    id: number,
    recipe: RecipeUpdateRequest
): Promise<Recipe | null> {

    const response = await fetch(
        `${API_URL}/recipes/updateRecipe/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
                // "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(recipe)
        }
    );

    if (!response.ok) {
        throw new Error("Nu s-a putut actualiza rețeta.");
    }

    const text = await response.text();

    return text ? JSON.parse(text) as Recipe : null;
}


export const signUp = async (data: RegisterModel): Promise<void> => {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Înregistrarea a eșuat.");
    }
};

export const login = async (
    data: LoginModel
): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Autentificarea a eșuat.");
    }

    return response.json() as Promise<LoginResponse>;
};

export async function getRecipeById(id: number): Promise<Recipe> {
    const response = await fetch( `${API_URL}/recipes/getById/${id}`,{
        method: "GET"
    });

   if (!response.ok) {
        throw new Error("Nu s-a putut găsi rețeta.");
    }

    return await response.json();
}

export const logout = (): void => {
    localStorage.removeItem("authToken");
};

