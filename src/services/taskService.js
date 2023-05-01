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
