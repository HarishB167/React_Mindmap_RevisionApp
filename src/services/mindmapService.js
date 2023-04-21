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

export async function saveMindmap(mindmap) {
  const m = {
    title: mindmap.title,
    description: mindmap.description,
    category: mindmap.category,
    image_link: mindmap.mindmapImageUrl,
    creation_date: new Date().toISOString(),
    revision_level: mindmap.revisionLevel,
  };
  if (mindmap.id) {
    const result = await http.put(`/revisionapp/mindmaps/${mindmap.id}/`, m);
    return result.data;
  } else {
    const result = await http.post("/revisionapp/mindmaps/", m);
    return result.data;
  }
}
