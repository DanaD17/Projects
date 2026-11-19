import { useState } from 'react';
import '../AddRecipe/AddRecipe.scss';
import { addRecipe } from '../../services/recipeService';
import type { CreateRecipeRequest } from '../../models/CreateRecipeRequest';
import { NavLink } from 'react-router-dom';
import type { FormEvent } from 'react';
import { FaBook, FaHouse } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';

export function AddRecipe() {
    const [title, setTitle] = useState('');
    const [images, setImages] = useState(['', '', '']);
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const [originCountry, setOriginCountry] = useState('');
    const [foodCategory, setFoodCategory] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [servings, setServings] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const recipe: CreateRecipeRequest = {
            title,
            images: images
                // .split("\n")
                .map((image) => image.trim())
                .filter((image) => image !== ''),
            ingredients: ingredients
                .split('\n')
                .map((item) => item.trim())
                .filter((item) => item !== ''),
            recipeSteps: directions
                .split('\n')
                .map((step) => step.trim())
                .filter((step) => step !== ''),
            originCountry,
            foodCategory,
            cookTimeMinutes: Number(cookingTime),
            servings: Number(servings),
        };

        try {
            const savedRecipe = await addRecipe(recipe);

            console.log('Recipe added:', savedRecipe);

            handleReset();
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    const handleReset = () => {
        setTitle('');
        setImages([]);
        setIngredients('');
        setDirections('');
        setOriginCountry('');
        setFoodCategory('');
        setCookingTime('');
        setServings('');
    };

    return (
        <div className="box">
            <div className="cover">
                <NavLink className="leftRibbon account" to="/account" viewTransition>
                    <MdAccountCircle />
                    <p>Account</p>
                </NavLink>
                <NavLink className="leftRibbon home" to="/" viewTransition>
                    <FaHouse /> <p>Home</p>
                </NavLink>
                <NavLink className="rightRibbon cookbook" to="/cookBook" viewTransition>
                    <p>Cookbook</p> <FaBook />
                </NavLink>

                <div className="p1 page"></div>
                <div className="p2 page"></div>
                <div className="p3 page">
                    <div className="p3__left-side">
                        <div className="p3__left-side-img img1">
                            <input
                                type="file"
                                id="img1"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const updated = [...images];
                                        updated[0] = file.name;
                                        setImages(updated);
                                    }
                                }}
                            />
                        </div>

                        <div className="p3__left-side-img img2">
                            <input
                                type="file"
                                id="img1"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const updated = [...images];
                                        updated[1] = file.name;
                                        setImages(updated);
                                    }
                                }}
                            />
                        </div>

                        <div className="p3__left-side-img  img3">
                            <input
                                type="file"
                                id="img1"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const updated = [...images];
                                        updated[2] = file.name;
                                        setImages(updated);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="p3__right-side">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="p3__right-side__top">
                                    <h1 className="title">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter Title"
                                            required
                                        />
                                    </h1>

                                    <div className="detailsRibbon"></div>

                                    <div className="details">
                                        <h1>
                                            Portii:
                                            <input
                                                type="number"
                                                name="servings"
                                                id="servings"
                                                value={servings}
                                                onChange={(e) => setServings(e.target.value)}
                                                placeholder="Enter servings"
                                                required
                                            />
                                        </h1>
                                        <h1>
                                            Durata:
                                            <input
                                                type="text"
                                                name="cookingTime"
                                                id="cookingTime"
                                                value={cookingTime}
                                                onChange={(e) => setCookingTime(e.target.value)}
                                                placeholder="Enter cookingTime"
                                                required
                                            />{' '}
                                        </h1>
                                        <h1>
                                            Bucatarie:
                                            <input
                                                type="text"
                                                name="originCountry"
                                                id="originCountry"
                                                value={originCountry}
                                                onChange={(e) => setOriginCountry(e.target.value)}
                                                placeholder="Enter originCountry"
                                                required
                                            />
                                        </h1>
                                        <h1>
                                            Categorie:
                                            <input
                                                type="text"
                                                name="foodCategory"
                                                id="foodCategory"
                                                value={foodCategory}
                                                onChange={(e) => setFoodCategory(e.target.value)}
                                                placeholder="Enter foodCategory"
                                                required
                                            />
                                        </h1>
                                    </div>
                                </div>

                                <div className="ingredients">
                                    <i>
                                        <h1 className="sectionTitle">Ingrediente</h1>
                                    </i>

                                    <ul className="ingredients__list">
                                        <textarea
                                            name="ingredients"
                                            id="ingredients"
                                            value={ingredients}
                                            onChange={(e) => setIngredients(e.target.value)}
                                            placeholder="Enter ingredients"
                                            required
                                        />
                                    </ul>
                                </div>

                                <div className="directions">
                                    <i>
                                        <h1 className="sectionTitle">Directii</h1>
                                    </i>

                                    <ul className="directions__list">
                                        <textarea
                                            name="directions"
                                            id="directions"
                                            value={directions}
                                            onChange={(e) => setDirections(e.target.value)}
                                            placeholder="Enter directions"
                                            required
                                        />
                                    </ul>
                                </div>
                            </div>
                            <div className="buttons">
                                <button type="reset" onClick={handleReset}>
                                    Reset
                                </button>

                                <button type="submit">Submit</button>
                            </div>
                        </form>
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
