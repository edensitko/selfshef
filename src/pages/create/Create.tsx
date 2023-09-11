

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
  import { firestoreProj } from "../../firebase/config";
import useTheme from '../hooks/useTheme';


const Create: React.FC = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCooking] = useState('');
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const ingredientInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { mode } = useTheme();
  const { color, changeColor } = useTheme();


const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
const doc = {title, ingredients, method, cookingTime:cookingTime + 'minutes'}

try{
  await firestoreProj.collection('recipes').add(doc)
  navigate('/')
}
catch(err){
  console.log('error', err)
}
}

const handleAdd = () => {
  setIngredients([...ingredients, newIngredient]);
  setNewIngredient('');
  if (ingredientInput.current) {
    ingredientInput.current.value = '';
  }
};



  return (
    <div className=' mt-5 max-w-xl m-auto text-xl'>
      <h2 className={`m-5 ${mode}:text-white`}>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label className={`mb-2 text-m font-medium text-gray-900 ${mode}:text-white`}>
          <span>Title</span>
          <input
           className={`bg-white ${mode}:text-white border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:text-white${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label className={`mb-2 text-m font-medium text-gray-900 ${mode}:text-white`}>
          <span>Ingredients</span>
          <div className='flex'>
            <input
              className={`bg-white ${mode}:text-white border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5  ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:text-white${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}
              type='text'
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd}     
           className={`bg-white w-32  p-2 m-auto ${mode}:text-white border border-gray-300 text-black text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:text-white${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}>
              Add
            </button>
          </div>     
        <p className={`mb-8 text-s font-small text-gray-900 ${mode}:text-white mt-5`}>current ingredirents: {ingredients.map(i=><em key ={i}>{i},</em>)}</p>

        </label>
        <label className={`mb-2 text-m font-medium text-gray-900 ${mode}:text-white`}>
          <span>Method</span>
          <input
             className={`bg-white ${mode}:text-white border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:text-white${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}
            type='text'
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />

        </label>
        <label className={`mb-2 text-m font-medium text-gray-900 ${mode}:text-white`}>
          <span>Time</span>
          <input
            className={`bg-white ${mode}:text-white border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${mode}:bg-gray-700 ${mode}:border-gray-600 ${mode}:placeholder-gray-400 ${mode}:text-white${mode}:focus:ring-blue-500 ${mode}:focus:border-blue-500`}
            type='number'
            onChange={(e) => setCooking(e.target.value)}
            value={cookingTime}
            required
          />
        </label >
        <button        
         style={{ background: color }}
          type='submit' 
          className={`text-white mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
>          Submit
        </button>
      </form>


      
    </div>



  );
  }
export default Create;

