import { requests } from "@core/axiosAgent";

const createGroup = (project: any) => requests.post("/project/create", project);

const getGroupsByProjectId = (projectId: number) =>
  requests.get(`/project/getByProject/${projectId}`);

const getGroupById = (id: number) => requests.get(`/project/${id}`);

export default {
  createGroup,
  getGroupsByProjectId,
  getGroupById,
};
