import { requests } from "@core/axiosAgent";

const createTask = (project: any) => requests.post("/project/create", project);

const getTasksByGroupId = (groupId: number) =>
  requests.get(`/project/getByGroup/${groupId}`);

const getTaskById = (id: number) => requests.get(`/project/${id}`);

export default {
  createTask,
  getTasksByGroupId,
  getTaskById,
};
