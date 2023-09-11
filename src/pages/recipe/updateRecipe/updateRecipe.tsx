
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { firestoreProj } from '../../../firebase/config';
import useTheme from '../../hooks/useTheme';

interface Recipe {
  title: string;
  ingredients: string;
  method: string;
  cookingTime:number
}

const UpdateRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL params
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newIngredients, setNewIngredients] = useState<string>('');
  const [newMethods, setNewMethods] = useState<string>('');
  const [newCookingTime, setNewCookingTime] = useState<any>('');
  const ingredientInput = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { color } = useTheme();
  const { mode } = useTheme();

  const [titleError, setTitleError] = useState<string | null>(null);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);
  const [methodsError, setMethodsError] = useState<string | null>(null);
  const [cookingTimeError, setCookingTimeError] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newIngredients) {
      setIngredientsError('Ingredients field is required');
      return;
    }

    setIngredients([...ingredients, newIngredients]);
    setNewIngredients('');
    if (ingredientInput.current) {
      ingredientInput.current.value = '';
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch the recipe document based on the 'id' from Firestore
      const fetchRecipe = async () => {
        try {
          const recipeRef = firestoreProj.collection('recipes').doc(id);
          const snapshot = await recipeRef.get();

          if (snapshot.exists) {
            // Retrieve the data of the existing recipe
            const data = snapshot.data() as Recipe;
            setRecipe(data);
            setNewTitle(data.title);
            setNewIngredients(data.ingredients);    
           setNewCookingTime(data.cookingTime);
           setNewMethods(data.method);


          } else {
            // Handle the case where the document does not exist
            console.log('Recipe not found.');
          }
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };

      fetchRecipe();
    }
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    if (!e.target.value) {
      setTitleError('Title field is required');
    } else {
      setTitleError(null);
    }
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMethods(e.target.value);
    if (!e.target.value) {
      setMethodsError('Method field is required');
    } else {
      setMethodsError(null);
    }
  };

  const handleCookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCookingTime(e.target.value);
    if (!e.target.value) {
      setCookingTimeError('Cooking Time field is required');
    } else {
      setCookingTimeError(null);
    }
  };

  const handleIngredientsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewIngredients(newValue);
    if (!newValue) {
      setIngredientsError('Ingredients field is required');
    } else {
      setIngredientsError(null);
    }
  };

  const handleUpdateRecipe = async () => {
    if (!newTitle) {
      setTitleError('Title field is required');
      return;
    }

    if (!newMethods) {
      setMethodsError('Method field is required');
      return;
    }

    if (!newCookingTime) {
      setCookingTimeError('Cooking Time field is required');
      return;
    }

    if (id && recipe) {
      try {
        await firestoreProj.collection('recipes').doc(id).update({
          title: newTitle,
          ingredients: ingredients,
          method: newMethods,
          cookingTime: newCookingTime,
        });
        console.log('Recipe updated successfully.');
      } catch (error) {
        console.error('Error updating recipe:', error);
      }
    }
  };

  return (
    <div className="mt-5 max-w-xl m-auto text-xl">
      <h2 className={`m-5`}>Update Recipe</h2>
      <div>
        <label className={`mb-2 text-m font-medium `}>New Title:</label>
        <input
          className={`bg-white ${mode}  border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}
          type="text"
          id="newTitle"
          value={newTitle}
          onChange={handleTitleChange}
          required
        />
        {titleError && <p className="text-red-500">{titleError}</p>}
      </div>
      <div>
        <label className={`mb-2 text-m font-medium text-gray-900  `}>New Cooking Time:</label>
        <input
          className={`bg-white ${mode} border mb-8 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}
          id="cooking"
          value={newCookingTime}
          onChange={handleCookingChange}
          required
        />
        {cookingTimeError && <p className="text-red-500">{cookingTimeError}</p>}
      </div>
      <div>
        <label className={`mb-2 text-m font-medium text-gray-900 `}>New Ingredients:</label>
        <input
          className={`bg-white ${mode} border border-gray-300 text-sm mb-1 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:text-white${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}
          type='text'
          onChange={handleIngredientsChange}
          value={newIngredients}
          ref={ingredientInput}
          required
        />
        {ingredientsError && <p className="text-red-500">{ingredientsError}</p>}
        <button
          className={`add bg-white w-32 m-auto mt-2 ${mode}  border border-gray-300 text-black text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:text-white${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}
          onClick={handleAdd}
        >
          Add
        </button>
        <p className={`mb-2 text-s font-small text-gray-900  `}>Current Ingredients: {ingredients.join(", ")}</p>
      </div>
      <div>
        <label className={` mb-2 text-m font-medium text-gray-900  text-black ${mode}: text-white`}>New Method:</label>
        <textarea
          className={`bg-white ${mode} border mb-8 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}
          id="newTitle"
          value={newMethods}
          onChange={handleMethodChange}
          required
        ></textarea>
        {methodsError && <p className="text-red-500">{methodsError}</p>}
      </div>
      <button
        style={{ background: color }}
        className={`text-white ${color}bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        onClick={handleUpdateRecipe}
      >
        Update Recipe
      </button>
    </div>
  );
};

export default UpdateRecipe;
