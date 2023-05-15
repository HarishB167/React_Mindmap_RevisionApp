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
      revisionDone: rItem.revision_done,
    })),
  }));

  return tasks;
}

export async function getTasksList() {
  const result = await http.get("/revisionapp/revisions/");
  let tasks = result.data.reduce((accumulator, currentValue) => {
    if (currentValue.revisions)
      return [...accumulator, ...currentValue.revisions];
    else return accumulator;
  }, []);

  tasks = tasks.map((item) => ({
    id: item.id,
    mindmapTitle: item.mindmap_title,
    revisionDate: item.date,
    category: item.mindmap_category,
    created: new Date(item.mindmap_created).toDateString(),
    status: item.revision_done,
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

export async function deleteRevisionItemForMindmap(mindmapId, revisionItem) {
  if (revisionItem.id) {
    const result = await http.delete(
      `/revisionapp/mindmaps/${mindmapId}/revisions/${revisionItem.id}/`
    );
    return result.data;
  }
}
