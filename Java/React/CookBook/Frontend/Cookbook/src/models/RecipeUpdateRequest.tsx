export type RecipeUpdateRequest = {
    title: string;
    images: string[];
    ingredients: string[];
    recipeSteps: string[];
    originCountry: string;
    foodCategory: string;
    cookTimeMinutes: number;
    servings: number;
};