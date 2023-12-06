import React, { useEffect } from "react";
import { API_URL } from "./CONFIG/config";
import { AJAX } from "./API/REQUEST";

const getRecipeById = async (id) => {
  const data = await AJAX(`${API_URL}/${id}`); // url+id
  const { recipe } = data.data;
  return recipe;
};

// 根据词条搜索
const search = async (query) => {
  try {
    const data = await AJAX(`${API_URL}?search=${query}`);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export { getRecipeById, search };
