import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import RecipeList from "../recipe/recipeList/recipeList";
import { firestoreProj } from "../../firebase/config";

function Search(): JSX.Element {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q');

    const { error, isPending, data } = useFetch(`http://your-api-url?query=${query}`);

    return (
        <div className="Search">
            <h2>Recipes including "{query}"</h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && 
            
            <RecipeList recipes={data} />}
        </div>
    );
}

export default Search;
