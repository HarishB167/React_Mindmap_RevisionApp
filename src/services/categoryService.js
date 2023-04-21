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
