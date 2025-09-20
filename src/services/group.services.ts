import { requests } from "@core/axiosAgent";

const createGroup = (group: any) => requests.post("/group/create", group);

const getGroupsByProjectId = (projectId: number) =>
  requests.get(`/group/getByProject/${projectId}`);

const getGroupById = (id: number) => requests.get(`/group/${id}`);

const updateGroupById = (group: any) => {
  const { id, ...rest } = group;
  return requests.patch(`/group/${id}`, rest);
};

const deleteGroup = (id: number) => requests.delete(`/group/${id}`);

export default {
  createGroup,
  getGroupsByProjectId,
  getGroupById,
  updateGroupById,
  deleteGroup,
};
