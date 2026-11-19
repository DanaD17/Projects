import { useEffect, useState } from 'react';
import './CookBook.scss';
import type { Recipe } from '../../models/RecipeModel';
import { getAllRecipes } from '../../services/recipeService';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { deleteById } from '../../services/recipeService';
import { FaTrash, FaHouse, FaPlus } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

export function Cookbook() {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
    const [checkedDirections, setCheckedDirections] = useState<Record<number, boolean>>({});
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    const currentRecipe = recipes[currentRecipeIndex];
    const [servingsOverride, setServingsOverride] = useState<number | null>(null);
    const servingsNumber = servingsOverride ?? currentRecipe?.servings ?? 1;
    const token = localStorage.getItem('authToken');

    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [showConfirmation, setShowConfirmation] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const data = await getAllRecipes();
                console.log(
                    'Recipe IDs:',
                    data.map((recipe) => recipe.id)
                );
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

    const goToNext = () => {
        setCurrentRecipeIndex((prev) => prev + 1);
        setServingsOverride(null);
    };

    const goToPrevous = () => {
        setCurrentRecipeIndex((prev) => prev - 1);
        setServingsOverride(null);
    };

    const handleCheck = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleCheckDirections = (index: number) => {
        setCheckedDirections((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const increaseServings = () => {
        setServingsOverride(servingsNumber + 1);
    };

    const decreaseServings = () => {
        setServingsOverride(Math.max(1, servingsNumber - 1));
    };

    const scaleIngredient = (ingredient: string, originalServings: number, newServings: number) => {
        const match = ingredient.match(/^(\d+(?:[.,]\d+)?)(.*)$/);

        if (!match || originalServings <= 0) {
            return ingredient;
        }

        const originalAmount = Number(match[1].replace(',', '.'));
        const rest = match[2];

        const newAmount = (originalAmount * newServings) / originalServings;

        return `${Number(newAmount.toFixed(2))}${rest}`;
    };

    const handleSelectRecipe = (recipeId: number) => {
        const index = recipes.findIndex((recipe) => recipe.id === recipeId);

        if (index !== -1) {
            setCurrentRecipeIndex(index);
            setSearchTerm('');
            setIsFocused(false);

            setServingsOverride(null);
            setCheckedItems({});
            setCheckedDirections({});
        }
    };

    const handleConfirm = () => {
        localStorage.removeItem('authToken');
        setShowConfirmation(false);
        navigate('/login');
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteById(id);

            const deletedIndex = recipes.findIndex((recipe) => recipe.id === id);

            const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);

            setRecipes(updatedRecipes);

            if (updatedRecipes.length === 0) {
                setCurrentRecipeIndex(0);
            } else if (deletedIndex <= currentRecipeIndex) {
                setCurrentRecipeIndex(Math.min(currentRecipeIndex, updatedRecipes.length - 1));
            }
        } catch (error) {
            console.error('Nu s-a putut șterge rețeta:', error);
        }
    };
    return (
        <div className="box">
            <div className="cover">
                {token != null ? (
                    <NavLink className="leftRibbon account" to="/account" viewTransition>
                        <MdAccountCircle />
                        <p>Account</p>
                    </NavLink>
                ) : (
                    <NavLink className="leftRibbon account" to="/login" viewTransition>
                        <MdAccountCircle />
                        <p>Login</p>
                    </NavLink>
                )}

                <NavLink className="leftRibbon home" to="/" viewTransition>
                    {' '}
                    <FaHouse /> <p>Home</p>
                </NavLink>

                {currentRecipeIndex > 0 && (
                    <div className="leftRibbon previousRecipe" onClick={goToPrevous}>
                        {' '}
                        <FaLongArrowAltLeft /> <p>Previous</p>{' '}
                    </div>
                )}

                {token != null ? (
                    <NavLink className="rightRibbon addRecipe" to="/addRecipe" viewTransition>
                        <p>Add</p> <FaPlus />
                    </NavLink>
                ) : (
                    <div
                        className="rightRibbon addRecipe"
                        onClick={() => setShowConfirmation(true)}
                    >
                         <p>Add</p> <FaPlus />
                    </div>
                )}

                {showConfirmation && (
                    <ConfirmationModal
                        title="Autentificare necesară"
                        message="Trebuie să te autentifici pentru a adăuga o rețetă."
                        confirmText="Continuă"
                        cancelText="Anulează"
                        onCancel={() => setShowConfirmation(false)}
                        onConfirm={handleConfirm}
                    />
                )}

                {currentRecipeIndex < recipes.length - 1 && (
                    <div className="rightRibbon nextRecipe" onClick={goToNext}>
                        {' '}
                        <p>Next</p> <FaLongArrowAltRight />{' '}
                    </div>
                )}

                <div className="p1 page"></div>
                <div className="p2 page"></div>
                <div className="p3 page">
                    <div className="p3__left-side">
                        <div className="search">
                            <SearchBar
                                onSearch={setSearchTerm}
                                onFocusChange={setIsFocused}
                                placeholder="Cauta o reteta"
                            />

                            {isFocused && (
                                <div className="recipe-list">
                                    {filteredRecipes.map((recipe) => (
                                        <div
                                            key={recipe.id}
                                            className="recipe-list__item"
                                            onMouseDown={() => handleSelectRecipe(recipe.id)}
                                        >
                                            {recipe.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <img
                            src={`./src/assets/${currentRecipe.images[0]}`}
                            alt={currentRecipe.title}
                            className="p3__left-side-img img1"
                        />

                        <img
                            src={`./src/assets/${currentRecipe.images[1]}`}
                            alt={currentRecipe.title}
                            className="p3__left-side-img img2"
                        />

                        <img
                            src={`./src/assets/${currentRecipe.images[2]}`}
                            alt={currentRecipe.title}
                            className="p3__left-side-img img3"
                        />
                    </div>

                    <div className="p3__right-side">
                        {currentRecipe && (
                            <div>
                                <div className="p3__right-side__top">
                                    <h1 className="recipeTitle">{currentRecipe.title}</h1>

                                    <h1 className="recipeAuthor">
                                        <i>
                                            {' '}
                                            By: <span>{currentRecipe.postedBy.firstName}</span>{' '}
                                        </i>
                                    </h1>

                                    <div className="ribbon"></div>

                                    <div className="recipeDetails">
                                        <h1 className="servings">
                                            Porții:
                                            <button type="button" onClick={decreaseServings}>
                                                -
                                            </button>
                                            {servingsNumber}
                                            <button type="button" onClick={increaseServings}>
                                                +
                                            </button>
                                        </h1>
                                        <h1>Durata: {currentRecipe.cookTimeMinutes} min</h1>
                                        <h1>Bucatarie: {currentRecipe.originCountry}</h1>
                                        <h1>Categorie: {currentRecipe.foodCategory}</h1>
                                    </div>
                                </div>

                                <button
                                    className="deleteButton"
                                    onClick={() => handleDelete(currentRecipe.id)}
                                >
                                    <FaTrash />
                                </button>

                                <div className="ingredients">
                                    <i>
                                        <h1 className="sectionTitle">Ingrediente</h1>
                                    </i>

                                    <ul className="ingredients__list">
                                        {currentRecipe.ingredients.map((ingredient, index) => (
                                            <li
                                                key={index}
                                                className={checkedItems[index] ? 'checked' : ''}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`ingredient-${index}`}
                                                    checked={checkedItems[index] || false}
                                                    onChange={() => handleCheck(index)}
                                                />

                                                <label htmlFor={`ingredient-${index}`}>
                                                    {scaleIngredient(
                                                        ingredient,
                                                        currentRecipe.servings,
                                                        servingsNumber
                                                    )}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="directions">
                                    <i>
                                        <h1 className="sectionTitle">Directii</h1>
                                    </i>

                                    <ul className="directions__list">
                                        {currentRecipe.recipeSteps.map((direction, index) => (
                                            <li
                                                key={index}
                                                className={
                                                    checkedDirections[index] ? 'checked' : ''
                                                }
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`direction-${index}`}
                                                    checked={checkedDirections[index] || false}
                                                    onChange={() => handleCheckDirections(index)}
                                                />

                                                <label htmlFor={`direction-${index}`}>
                                                    {direction}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
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
