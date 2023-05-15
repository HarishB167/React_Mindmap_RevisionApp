import http from "./httpService";
import { formatDate } from "./utils";

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
      id: mItem.id,
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

export async function getMindmapsList() {
  const result = await http.get("/revisionapp/mindmaps/");

  let mindmaps = result.data.map((item) => ({
    id: item.id,
    mindmapTitle: item.title,
    category: item.category_name,
    created: formatDate(new Date(item.creation_date)),
    nextRevision: item.next_revision_date
      ? formatDate(new Date(item.next_revision_date))
      : "",
    level: item.revision_level ? item.revision_level : "",
  }));
  return mindmaps;
}

export async function getMindmap(id) {
  const { data: mindmap } = await http.get(`/revisionapp/mindmaps/${id}`);
  const m = {
    id: id,
    title: mindmap.title,
    description: mindmap.description,
    category: mindmap.category,
    mindmapImageUrl: mindmap.image_link,
    creationDate: mindmap.creation_date,
    revisionLevel: mindmap.revision_level,
    revisionLevelId: mindmap.revision_level_id,
    revisionCount: mindmap.revision_count,
  };
  return m;
}

export async function saveMindmap(mindmap) {
  const m = {
    title: mindmap.title,
    description: mindmap.description,
    category: mindmap.category,
    image_link: mindmap.mindmapImageUrl,
    creation_date: new Date().toISOString(),
    revision_level: mindmap.revisionLevelId,
  };
  if (mindmap.id) {
    const result = await http.put(`/revisionapp/mindmaps/${mindmap.id}/`, m);
    return result.data;
  } else {
    const result = await http.post("/revisionapp/mindmaps/", m);
    return result.data;
  }
}

export async function deleteMindmap(mindmap) {
  if (mindmap.id) {
    const result = await http.delete(`/revisionapp/mindmaps/${mindmap.id}/`);
    return result.data;
  }
}
