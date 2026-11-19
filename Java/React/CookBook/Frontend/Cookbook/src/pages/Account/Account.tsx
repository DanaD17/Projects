import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/recipeService.tsx';
import { useEffect, useState } from 'react';
import { getAllRecipes } from '../../services/recipeService.tsx';
import type { Recipe } from '../../models/RecipeModel.tsx';
import './Account.scss';
import { jwtDecode } from 'jwt-decode';
import { FaBook, FaHouse } from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';

export function Account() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
       
    };

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    interface JwtPayload {
        id: number;
    }

    const token = localStorage.getItem('authToken');

    const id = token ? jwtDecode<JwtPayload>(token).id : undefined;

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const data = await getAllRecipes();
                setRecipes(data);
            } catch (error) {
                setError('Nu s au putut incarca retetele');
                console.log('', error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipes();
    }, []);

    if (loading) {
        return <p>Loading recipes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="box">
            <div className="cover">
                <NavLink className="leftRibbon" to="/" viewTransition>
                    <FaHouse /> <p>Home</p>
                </NavLink>

                <NavLink className="leftRibbon logOut"  onClick={handleLogout} to="/login" viewTransition>
                    <FaSignOutAlt className="icon" />
                   <p>LogOut</p> </NavLink>

                <NavLink className="rightRibbon cookbook" to="/cookBook" viewTransition>
                    <p>Cookbook</p> <FaBook />
                </NavLink>

                <div className="p1 page"></div>
                <div className="p2 page"></div>
                <div className="p3-account page">
                    <div className="p3-account__left-side">
                        <div className="recipe-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Titlu</th>
                                        <th>Categorie</th>
                                        <th>Bucatarie</th>
                                        <th>Nr Portii</th>
                                        <th>Ingrediente</th>
                                        <th>Pasi</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recipes
                                        .filter((recipe) => recipe.postedBy?.id === id)
                                        .map((recipe) => (
                                            <tr
                                                key={recipe.id}
                                                className="recipe-list__item"
                                                onClick={() => navigate(`/recipe/${recipe.id}`)}
                                            >
                                                <td>
                                                    <img
                                                        src={`./src/assets/${recipe.images[0]}`}
                                                        alt={recipe.title}
                                                    />
                                                </td>
                                                <td>{recipe.title}</td>
                                                <td>{recipe.foodCategory}</td>
                                                <td>{recipe.originCountry}</td>
                                                <td>{recipe.servings}</td>
                                                <td>
                                                    <div className="recipe-list__ingredients">
                                                        {recipe.ingredients.map(
                                                            (ingredient, index) => (
                                                                <p key={index}>{ingredient}</p>
                                                            )
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="recipe-list__steps">
                                                        {recipe.recipeSteps.map(
                                                            (direction, index) => (
                                                                <p key={index}>
                                                                    {index + 1}. {direction}
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>

                    {/* <div className="p3__right-side">
                    </div> */}
                </div>
                <p className="dome d1"></p>
                <p className="dome d2"></p>
                <p className="dome d3"></p>
                <p className="dome d4"></p>

                <div className="bookSpine"></div>
            </div>
        </div>
    );
}
