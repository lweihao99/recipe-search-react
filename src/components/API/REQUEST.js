import React from "react";

export async function AJAX(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
