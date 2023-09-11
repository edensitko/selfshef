import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { firestoreProj } from '../../firebase/config';
import UpdateRecipe from './updateRecipe/updateRecipe'; // Note the correct capitalization and file extension

interface Recipe {
  id: string;
  title: string;
  cookingTime: string;
  method: string;
  ingredients: string[]; 
}

function RecipeComponent() {
  const { id } = useParams();
  const { mode } = useTheme();
  const { color } = useTheme();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [newIngredient, setNewIngredient] = useState('');
  const [show, setShow] = useState<boolean>(false);

  function toggleShow() {
    setShow(!show);

  }
  const buttonText = show ? "cancel" : "edit";


  const addIngredient = () => {
    if (newIngredient.trim() === '') {
      return; 
     
    }

    const updatedIngredients = [...(recipe?.ingredients || []), newIngredient];

    // Update the recipe state with the updated ingredients
    setRecipe(recipe => {
      if (recipe) {
        return { ...recipe, ingredients: updatedIngredients };
      }
      return null;
    });

    // Clear the ingredient input field
    setNewIngredient('');
  };

  useEffect(() => {
    const recipeRef = firestoreProj.collection('recipes').doc(id);

    // Set up a real-time listener for the recipe document
    const unsubscribe = recipeRef.onSnapshot(
      (doc) => {
        if (doc.exists) {
          const recipeData = doc.data() as Recipe;
          setRecipe(recipeData);
          setLoading(false);
          setError('');
        } else {
          setRecipe(null);
          setLoading(false);
          setError('Recipe not found.');
        }
      },
      (error) => {
        console.error('Error fetching recipe:', error);
        setRecipe(null);
        setLoading(false);
        setError('Error fetching recipe.');
      }
    );

    return () => unsubscribe();
  }, [id]);

  
  return (   
     <div className=" ">

    <div className  ={` recipe p-10 bg-white ${mode} rounded-xl text-center drop-shadow-md  ${mode}:border-gray-900`}>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {recipe && (
        <>
          <h2 className={`mb-2 text-2xl font-bold tracking-tight text-black ${mode}:text-white`}>{recipe.title}</h2>
          <p className={`mb-3 font-normal text-black ${mode}:text-white`}>Takes {recipe.cookingTime} minutes to cook</p>
          {Array.isArray(recipe.ingredients) ? (
            <ul className={`mb-3 font-normal `}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient ">{ingredient}</li>
              ))}
            </ul>) : (
            <p className="error">Ingredients is not an array</p>
          )}
         
          <p className={`mb-3 font-normal text-gray-700 ${mode}:text-white `}>{recipe.method}</p>
         
         
        </> 
   
      )}   

    </div> 
    <div className="component-container text-center p-2"><br/>
    <button onClick={toggleShow} style={{ background:color }} className='  edit inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '>
        {buttonText}</button>   
     {show && <UpdateRecipe />}

  </div>
    </div>
  );
}

export default RecipeComponent;
