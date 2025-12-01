export default function filterRecipes(recipes, pantry = [], searchQuery = "") {
    if (!recipes) return [];

    return recipes.filter((recipe) => {
        if (!recipe) return false;

        // Pantry filtering
        if (pantry.length > 0) {
            const hasAllIngredients = pantry.every((item) =>
                recipe.ingredients.some((ingredient) =>
                    ingredient.toLowerCase().includes(item.toLowerCase())
                )
            );
            if (!hasAllIngredients) return false;
        }

        // Search filtering
        if (searchQuery && searchQuery.trim() !== "") {
            const text = searchQuery.toLowerCase();
            if (!recipe.title.toLowerCase().includes(text)) return false;
        }

        return true;
    });
}