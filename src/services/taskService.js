import http from "./httpService";

export async function getTasks() {
  const result = await http.get("/revisionapp/revisions/");

  const tasks = result.data.map((item) => ({
    taskHeader: item.date,
    taskItems: item.revisions.map((rItem) => ({
      id: rItem.id,
      title: rItem.mindmap_title,
      datetime: rItem.date,
      category: rItem.mindmap_category,
    })),
  }));

  return tasks;
}

export async function getTask(id) {
  const result = await http.get(`/revisionapp/revisions/${id}`);
  return result.data;
}

export async function saveRevisionItemForMindmap(mindmapId, revisionItem) {
  const rI = {
    date: revisionItem.date,
    revision_done: revisionItem.revision_done,
  };
  if (revisionItem.id) {
    const result = await http.put(
      `/revisionapp/mindmaps/${mindmapId}/revisions/${revisionItem.id}/`,
      rI
    );
    return result.data;
  } else {
    const result = await http.post(
      `/revisionapp/mindmaps/${mindmapId}/revisions/`,
      rI
    );
    return result.data;
  }
}
