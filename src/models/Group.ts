export interface IGroup {
  id: number;
  name: string;
  description: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IGroupRequest {
  name: string;
  description: string;
}
