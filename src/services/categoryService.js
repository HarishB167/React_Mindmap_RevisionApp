import http from "./httpService";
import { intToRGB, hashCode } from "./utils";

export async function getCategories() {
  const result = await http.get("/revisionapp/categories/");

  const categories = result.data.map((ctg) => ({
    id: ctg.id,
    name: ctg.title,
    iconElement: <span>{ctg.title.charAt(0)}</span>,
    bgColor: intToRGB(hashCode(ctg.title)),
  }));

  return categories;
}

export async function getCategoriesList() {
  const result = await http.get("/revisionapp/categories/");

  const categories = result.data.map((ctg) => ({
    id: ctg.id,
    name: ctg.title,
  }));

  return categories;
}

export async function saveCategory(category) {
  const c = {
    title: category.title,
  };
  if (category.id) {
    const result = await http.put(`/revisionapp/categories/${category.id}/`, c);
    return result.data;
  } else {
    const result = await http.post("/revisionapp/categories/", c);
    return result.data;
  }
}
