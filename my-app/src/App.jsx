import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discover from './pages/Discover';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Pantry from './pages/Pantry';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import { FavoritesProvider } from './context/FavoritesContext';
import useWindowSize from "./hooks/useWindowSize";

export default function App(){
  const [width, height] = useWindowSize();
  const isMobile = width < 768;
  return (
    <FavoritesProvider>
      <Router>

        {isMobile 
          ? <Header variant= "mobile" />
          : <Header variant = "desktop" />}

        <div style = {{padding: "20px"}}>
          {isMobile ? (
            <Routes>
              <Route path = "/" element = {<Home mobile/>} />
              <Route path = "/discover" element = {<Discover mobile/>} />
              <Route path = "/pantry" element = {<Pantry mobile/>} />
              <Route path = "/recipedetails/:id" element = {<RecipeDetails mobile/>} />
              <Route path = "/favorites" element = {<Favorites mobile/>} />
              <Route path = "*" element = {<NotFound/>} />
            </Routes>
          ) : (
            <Routes>
              <Route path = "/" element = {<Home />} />
              <Route path = "/discover" element = {<Discover />} />
              <Route path = "/pantry" element = {<Pantry />} />
              <Route path = "/recipedetails/:id" element = {<RecipeDetails />} />
              <Route path = "/favorites" element = {<Favorites />} />
              <Route path = "*" element = {<NotFound/>} />
            </Routes>
          )}
        </div>
      </Router>
    </FavoritesProvider>
  );
}
