import { fetchData, search } from "../Search";

const state = {
  recipe: {},
  search: {
    results: [],
  },
};

const createRecipeObject = (recipe) => {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

const getRecipe = async () => {
  const recipe = await fetchData();
  state.recipe = createRecipeObject(recipe);
  console.log(
    "🚀 ~ file: data.js:24 ~ getRecipe ~ state.recipe:",
    state.recipe
  );
};

const searchRecipe = async (query) => {
  const data = await search(query);
  const { recipes } = data.data;

  state.search.results = data.data.recipes.map((rec) => {
    return {
      id: rec.id,
      title: rec.title,
      publisher: rec.publisher,
      image: rec.image_url,
    };
  });

  return state.search.results;
};

export { searchRecipe, createRecipeObject, getRecipe, state };
