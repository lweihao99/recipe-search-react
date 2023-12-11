import { useEffect } from "react";
import { getRecipeById, search } from "../Search";
import { message } from "antd";

const state = {
  recipe: {},
  search: {
    results: [],
  },
  bookmarks: [],
};

// 转化数据对象样式
const createRecipeObject = (recipe, isBookmarked) => {
  return {
    bookmark: isBookmarked,
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

const getRecipe = async (id, isBookmarked) => {
  const recipe = await getRecipeById(id);
  state.recipe = createRecipeObject(recipe, isBookmarked);
  return state.recipe;
};

// 根据关键字搜索食谱
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

// 更新食谱材料份数
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
    message.warning(error.message);
  }
};

// 书签
const recipeBookmarked = (newRecipe) => {
  if (newRecipe.bookmark) {
    state.bookmarks.push(newRecipe);
  } else {
    state.bookmarks = state.bookmarks.filter(
      (recipe) => recipe.id !== newRecipe.id
    );
  }

  persistBookmark(); // 更新本地存储
};

// 书签窗口渲染
const renderBookmark = () => {
  return state.bookmarks;
};

// add local storage
const persistBookmark = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// clear local storage
function clearBookmarks() {
  state.bookmarks = [];
  localStorage.removeItem("bookmarks");
}

// 获取初始化食谱数据
const init = () => {
  const item = localStorage.getItem("bookmarks");
  if (item) {
    state.bookmarks = JSON.parse(item);
    return state.bookmarks;
  }
};

export {
  searchRecipe,
  createRecipeObject,
  getRecipe,
  state,
  updateServings,
  recipeBookmarked,
  renderBookmark,
  init,
  clearBookmarks,
};
