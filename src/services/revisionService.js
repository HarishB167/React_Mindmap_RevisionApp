import http from "./httpService";

export async function getRevisionLevels() {
  const result = await http.get("/revisionapp/levels/");
  return result.data;
}
