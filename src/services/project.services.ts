import { requests } from "@core/axiosAgent";

const createProject = (project: any) =>
  requests.post("/project/create", project);

const getOwnProjects = () => requests.get("/project/getByUser");

const getProjectById = (id: number) => requests.get(`/project/${id}`);

const updateProjectById = (project: any) => {
  const { id, ...rest } = project;
  return requests.patch(`/project/${id}`, rest);
};

const deleteProject = (id: number) => requests.delete(`/project/${id}`);

export default {
  createProject,
  getOwnProjects,
  getProjectById,
  updateProjectById,
  deleteProject,
};
