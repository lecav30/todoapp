export interface IProject {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectRequest {
  name: string;
  description: string;
}
