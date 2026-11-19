import type { UserModel } from "./UserModel";

export interface Recipe {
    id: number;
    title: string;
    images: string[];
    recipeSteps: string[];
    ingredients: string[];
    originCountry: string;
    foodCategory: string;
    cookTimeMinutes: number;
    servings: number;
    postedBy: UserModel;
}