import http from "./httpService";
import { intToRGB, hashCode, formatDate } from "./utils";

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

export async function getMindmaps() {
  const result = await http.get("/revisionapp/mindmaps/");

  const mindmaps = result.data;
  const nestedMaps = {};

  mindmaps.forEach((mMap) => {
    const category = mMap.category_name;
    if (category in nestedMaps) nestedMaps[category].push(mMap);
    else nestedMaps[category] = [mMap];
  });

  const data = Object.entries(nestedMaps).map((item) => ({
    mindmapCategory: item[0],
    mindmapItems: item[1].map((mItem) => ({
      title: mItem.title,
      createDate: formatDate(new Date(mItem.creation_date)),
      nextRevision: mItem.next_revision_date
        ? formatDate(new Date(mItem.next_revision_date))
        : "",
      level: mItem.revision_level ? mItem.revision_level : "",
    })),
  }));

  return data;
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
