import { getRecipeById, search } from "../Search";
import { message } from "antd";

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

const getRecipe = async (id) => {
  const recipe = await getRecipeById(id);
  state.recipe = createRecipeObject(recipe);
};

const searchRecipe = async (query) => {
  const data = await search(query);

  if (!data) {
    message.error("No data found");
    throw new Error("No data found");
  } else {
    const { recipes } = data.data;

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    message.success("Search successful");

    return state.search.results;
  }
};

const updateServings = function (newServings) {
  try {
    const updatedRecipe = { ...state.recipe };
    if (!updatedRecipe.id) throw new Error("Something is wrong");

    updatedRecipe.ingredients = updatedRecipe.ingredients.map((ing) => {
      return {
        ...ing,
        quantity: (ing.quantity * newServings) / state.recipe.servings,
      };
    });

    // update new servings number
    updatedRecipe.servings = newServings;

    return updatedRecipe;
  } catch (error) {
    message.error(error.message);
  }
};

export { searchRecipe, createRecipeObject, getRecipe, state, updateServings };
