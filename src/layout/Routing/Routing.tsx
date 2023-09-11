import { Route, Routes } from 'react-router-dom';
import Create from "../../pages/create/Create";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import Home from "../../pages/home/Home";
import Search from "../../pages/search/search";
import Recipe from "../../pages/recipe/recipe";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/search" element={<Search />} />
                <Route path="/recipes/:id" element={<Recipe />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
