import React, { useEffect } from "react";
import { API_URL } from "./CONFIG/config";
import { AJAX } from "./API/REQUEST";

const fetchData = async () => {
  const data = await AJAX(`${API_URL}/5ed6604591c37cdc054bc886`); // url+id
  const { recipe } = data.data;
  return recipe;
};
const search = async (query) => {
  const data = await AJAX(`${API_URL}?search=${query}`);
  return data;
};

export { fetchData, search };
