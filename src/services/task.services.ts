import { requests } from "@core/axiosAgent";

const createTask = (project: any) => requests.post("/task/create", project);

const getTasksByGroupId = (groupId: number) =>
  requests.get(`/task/getByGroup/${groupId}`);

const getTaskById = (id: number) => requests.get(`/task/${id}`);

export default {
  createTask,
  getTasksByGroupId,
  getTaskById,
};
