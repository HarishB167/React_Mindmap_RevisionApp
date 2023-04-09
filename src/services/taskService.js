import http from "./httpService";

export async function getTasks() {
  const result = await http.get("/revisionapp/revisions/");

  const tasks = result.data.map((item) => ({
    taskHeader: item.date,
    taskItems: item.revisions.map((rItem) => ({
      title: rItem.mindmap_title,
      datetime: rItem.date,
      category: rItem.mindmap_category,
    })),
  }));

  return tasks;
}
