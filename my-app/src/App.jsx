import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discover from './pages/Discover';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Pantry from './pages/Pantry';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import Header from './components/Header';

export default function App(){
  return (
    <Router>
      <Header />
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path = "/discover" element = {<Discover/>} />
          <Route path = "/pantry" element = {<Pantry/>} />
          <Route path = "/recipedetails/:id" element = {<RecipeDetails/>} />
          <Route path = "/favorites" element = {<Favorites/>} />
           <Route path = "*" element = {<NotFound/>} />
        </Routes>
    </Router>
  );
}
