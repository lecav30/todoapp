import { requests } from "@core/axiosAgent";

const createTask = (task: any) => requests.post("/task/create", task);

const getTasksByGroupId = (groupId: number) =>
  requests.get(`/task/getByGroup/${groupId}`);

const getTaskById = (id: number) => requests.get(`/task/${id}`);

const updateTaskById = (task: any) => {
  const { id, ...rest } = task;
  return requests.put(`/task/${id}`, rest);
};

const toggleCompletitionTaskById = (id: number) =>
  requests.patchWithoutBody(`/task/${id}/toggleCompletion`);

export default {
  createTask,
  getTasksByGroupId,
  getTaskById,
  updateTaskById,
  toggleCompletitionTaskById,
};
