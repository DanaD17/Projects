import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../../services/recipeService';
import type { Recipe } from '../../models/RecipeModel';
import './RecipeDetails.scss';
import type { RecipeUpdateRequest } from '../../models/RecipeUpdateRequest';
import { MdEdit } from 'react-icons/md';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [editForm, setEditForm] = useState({
        title: '',
        images: '',
        ingredients: '',
        recipeSteps: '',
        originCountry: '',
        foodCategory: '',
        cookTimeMinutes: 0,
        servings: 1,
    });

    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<(File | null)[]>([null, null, null]);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                if (!id) {
                    throw new Error('ID invalid');
                }

                const data = await getRecipeById(Number(id));
                setRecipe(data);
            } catch (err) {
                console.error(err);
                setError('Nu s-a putut încărca rețeta.');
            } finally {
                setLoading(false);
            }
        }

        fetchRecipe();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!recipe) return <p>Rețeta nu a fost găsită.</p>;

    const handleEdit = () => {
        if (!recipe) return;

        setEditForm({
            title: recipe.title,
            images: '',
            ingredients: recipe.ingredients.join('\n'),
            recipeSteps: recipe.recipeSteps.join('\n'),
            originCountry: recipe.originCountry,
            foodCategory: recipe.foodCategory,
            cookTimeMinutes: recipe.cookTimeMinutes,
            servings: recipe.servings,
        });

        setExistingImages([...recipe.images]);
        setNewImages([null, null, null]);
        setIsEditing(true);
    };

    const handleChange = (field: keyof typeof editForm, value: string | number) => {
        setEditForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        if (!recipe || !id) return;

        try {
            setSaving(true);

            const updatedRecipe: RecipeUpdateRequest = {
                title: editForm.title,
                images: editForm.images
                    .split('\n')
                    .map((item) => item.trim())
                    .filter(Boolean),

                ingredients: editForm.ingredients
                    .split('\n')
                    .map((item) => item.trim())
                    .filter(Boolean),

                recipeSteps: editForm.recipeSteps
                    .split('\n')
                    .map((item) => item.trim())
                    .filter(Boolean),

                originCountry: editForm.originCountry,
                foodCategory: editForm.foodCategory,
                cookTimeMinutes: Number(editForm.cookTimeMinutes),
                servings: Number(editForm.servings),
            };

            const result = await updateRecipe(Number(id), updatedRecipe);

            setRecipe(
                result ?? {
                    ...recipe,
                    ...updatedRecipe,
                }
            );

            setIsEditing(false);
        } catch (error) {
            console.error(error);
            setError('Nu s-a putut salva rețeta.');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setNewImages((prev) => {
            const updated = [...prev];
            updated[index] = file;
            return updated;
        });

        e.target.value = '';
    };

    return (
        <div className="recipe-details">
            {!isEditing ? (
                <div className="recipe-details__content">
                    <button
                        className="recipe-details__back-btn content-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        <FaLongArrowAltLeft />
                    </button>

                    <button className="recipe-details__edit-btn" onClick={handleEdit}>
                        <MdEdit />
                    </button>
                    <div className="recipe-details__header">
                        <h1>{recipe.title}</h1>

                        <p>
                            {recipe.foodCategory} | {recipe.originCountry}
                        </p>

                        <p>
                            {recipe.cookTimeMinutes} minute |{recipe.servings} porții
                        </p>
                    </div>

                    <div className="recipe-details__images">
                        {recipe.images.map((image, index) => (
                            <img
                                key={index}
                                src={`/src/assets/${image}`}
                                alt={`${recipe.title} ${index + 1}`}
                            />
                        ))}
                    </div>

                    <ul className="recipe-details__ingredients">
                        <h2>Ingrediente</h2>

                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>

                    <ul className="recipe-details__steps">
                        <h2>Mod de preparare</h2>

                        {recipe.recipeSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="recipe-details__edit">
                    <button
                        className="recipe-details__back-btn edit-back-btn"
                        onClick={() => setIsEditing(false)}
                        disabled={saving}
                    >
                        <FaLongArrowAltLeft />
                    </button>

                    <h1>Edit Recipe</h1>

                    <label>Title</label>
                    <input
                        value={editForm.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />

                    <label>Category</label>
                    <input
                        value={editForm.foodCategory}
                        onChange={(e) => handleChange('foodCategory', e.target.value)}
                    />

                    <label>Origin Country</label>
                    <input
                        value={editForm.originCountry}
                        onChange={(e) => handleChange('originCountry', e.target.value)}
                    />

                    <label>Cooking Time (minutes)</label>
                    <input
                        type="number"
                        min="1"
                        value={editForm.cookTimeMinutes}
                        onChange={(e) => handleChange('cookTimeMinutes', Number(e.target.value))}
                    />

                    <label>Servings</label>
                    <input
                        type="number"
                        min="1"
                        value={editForm.servings}
                        onChange={(e) => handleChange('servings', Number(e.target.value))}
                    />

                    <label>Recipe Images</label>
                    <div className="recipe-details__image-upload">
                        <div className="image-preview">
                            {[0, 1, 2].map((index) => {
                                const preview = newImages[index]
                                    ? URL.createObjectURL(newImages[index]!)
                                    : `/src/assets/${existingImages[index]}`;

                                return (
                                    <div className="image-item" key={index}>
                                        <img src={preview} alt={`Recipe image ${index + 1}`} />

                                        <label className="replace-image">
                                            <MdEdit /> Replace image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={(e) => handleImageUpload(index, e)}
                                            />
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <label>Ingredients (one per line)</label>
                    <textarea
                        value={editForm.ingredients}
                        onChange={(e) => handleChange('ingredients', e.target.value)}
                    />

                    <label>Recipe Steps (one per line)</label>
                    <textarea
                        value={editForm.recipeSteps}
                        onChange={(e) => handleChange('recipeSteps', e.target.value)}
                    />

                    <div className="recipe-details__actions">
                        <button onClick={() => setIsEditing(false)} disabled={saving}>
                            Cancel
                        </button>

                        <button onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
