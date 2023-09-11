import useTheme from "../../hooks/useTheme";
import { Link } from "react-router-dom";
import { firestoreProj } from "../../../firebase/config";
import { useState } from "react";

type Recipe = {
  id: number;
  title: string;
  cookingTime:number;
  method:string;
  ingredients: string[]; 
};

interface RecipeListProps {
  recipes: Recipe[];
}

function RecipeList({ recipes }: RecipeListProps): JSX.Element { 
    const { color } = useTheme();
    const {mode}=useTheme()
    const [searchQuery, setSearchQuery] = useState('');

    if(recipes.length === 0){
      return <div>No recipes found...</div>;
    }
  
    const handleClick =(id:any)=>{
      firestoreProj.collection('recipes').doc(id).delete();
    }


    // Define filteredRecipes inside the component's body
    const filteredRecipes = recipes.filter((recipe) => {
      // Convert both the recipe title and searchQuery to lowercase for case-insensitive matching
      const title = recipe.title.toLowerCase();
      const query = searchQuery.toLowerCase();

      // Check if the recipe title includes the search query
      return title.includes(query);
    });

  return (
    <div className={`m-auto`}>
<form  > 
      <label className="relative block ">
  <span className="sr-only">Search</span>
  <span className="absolute inset-y-0  left-0 flex items-center pl-2">

    <button>
    <svg xmlns="http://www.w3.org/2000/svg"  fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>


</button>

 </span>
  <input 
   type="text"
   value={searchQuery}
   onChange={(e) => setSearchQuery(e.target.value)}
   required 
  className={`${mode} placeholder:italic mb-5 placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`} placeholder="Search ..."  name="search"/>
</label>
      </form>
      {filteredRecipes.length === 0 ? (
        <div>No recipes found...</div>
      ) : (
        <div className={` grid grid-cols-1 gap-4 m-auto lg:grid-cols-4 sm:grid-cols-2 `}>
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className={`recipe p-10 bg-white rounded-xl text-center drop-shadow-md  ${mode}  :border-gray-900`}>
              <h3 className={`mb-2 text-2xl font-bold tracking-tight text-black ${mode}:text-white`}>{recipe.title}</h3>    
             <p className={`mb-3 font-normal text-black ${mode} `}>{recipe.cookingTime} minutes to cook </p>
              <h2 className={`mb-2 text-l font-bold tracking-tight ing text-gray-400 ${mode}`}>{recipe.ingredients.toString().substring(0,50)}...</h2>
              <p className={`mb-3 font-normal ${mode} `}>{recipe.method.substring(0, 100)}....</p>
              <button>
                <Link style={{ background: color }} className={`edit inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   ${mode}:hover:bg-blue-700 ${mode}:focus:ring-blue-800 `} to={`/recipes/${recipe.id}`}>Cook this</Link>
              </button>
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className={`w-7 h-7 cursor-pointer	top-5 rounded-full text-black fill-gray-300 absolute right-5 ${mode}`} onClick={() => handleClick(recipe.id)}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              
            </div>
            
          ))}
        </div>
      )}

  
    </div>

    
  );
}

export default RecipeList;
