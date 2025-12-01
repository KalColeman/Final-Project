import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Discover from './pages/Discover';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Pantry from './pages/Pantry';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import {FavoritesProvider} from './context/FavoritesContext';
import useWindowSize from "./hooks/useWindowSize";

export default function App(){
  const {width}  = useWindowSize();
  const isMobile = width < 768;

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <FavoritesProvider>
      <Router>
        <Header onSearch = {text => setSearchQuery(text)} />

        <div style = {{padding: "20px"}}>
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/discover" element = {<Discover searchQuery = {searchQuery} />} />
            <Route path = "/pantry" element = {<Pantry />} />
            <Route path = "/recipe/:id" element = {<RecipeDetails />} />
            <Route path = "/favorites" element = {<Favorites />} />
            <Route path = "*" element = {<NotFound/>} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}
