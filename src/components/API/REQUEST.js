import React from "react";

export async function AJAX(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results === 0) throw new Error("No data found");

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
