export interface CreateRecipeRequest {
    title: string;
    images: string[];
    recipeSteps: string[];
    ingredients: string[];
    originCountry: string;
    foodCategory: string;
    cookTimeMinutes: number;
    servings: number;
}