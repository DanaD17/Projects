
import {HomePage} from "./pages/HomePage/HomePage"
import { MainLayout } from "./layout/MainLayout";
import { Cookbook } from "./pages/CookBook/Cookbook";
import { AddRecipe } from "./components/AddRecipe/AddRecipe";
import { Account } from "./pages/Account/Account";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import { AIRecipeGenerator } from "./components/AIRecipeGenerator/AIRecipeGenerator";
import { RecipeDetails } from "./pages/RecipeDetails/RecipeDetails";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cookbook",
        element: <Cookbook />,
      },
      {
        path: "addRecipe",
        element: <AddRecipe />,
      },
      {
        path: "account",
        element: <Account />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "recipeIdeaProvider",
        element: <AIRecipeGenerator />
      },
       {
        path: "recipe/:id",
        element: <RecipeDetails />
      }
      
    ],
  },
];