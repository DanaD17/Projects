export interface AIRecipeRequest {
    ingredients: string[];
    maxCookingTime: number;
    servings: number;
    foodCategory: string;
    originCountry: string;
}

export interface GeneratedRecipe {
    title: string;
    ingredients: string[];
    recipeSteps: string[];
    originCountry: string;
    foodCategory: string;
    cookTimeMinutes: number;
    servings: number;
}