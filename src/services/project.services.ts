import { requests } from "@core/axiosAgent";

const createProject = (project: any) =>
  requests.post("/project/create", project);

const getOwnProjects = () => requests.get("/project/getByUser");

const getProjectById = (id: number) => requests.get(`/project/${id}`);

export default {
  createProject,
  getOwnProjects,
  getProjectById,
};
