export default function filterRecipes(recipes, options = {}) {
    if (!recipes || !Array.isArray(recipes)) return [];

    const {
        search = "",
        pantry = [],
        requirePantry = false,
    } = options;

    return recipes.filter(recipe => {
        if (search.trim() !== "") {
            const text = search.toLowerCase();
            const matchesText = 
            recipe.title?.toLowerCase().includes(text) ||
            recipe.description?.toLowerCase().includes(text);

            if (!matchesText) return false;
        }
    
        if (requirePantry && pantry.length > 0) {
            const ingredients = recipe.ingredients || [];

            const hasAllIngredients = pantry.every(item => 
                ingredients.includes(item)
            );

            if (!hasAllIngredients) return false;
        }

        return true;
    });
}