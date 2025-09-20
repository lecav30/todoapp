export interface ITask {
  id: number;
  groupId: number;
  name: string;
  description: string;
  completed: boolean;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskRequest {
  groupId: number;
  name: string;
  description: string;
  deadline: string;
}

export interface ITaskUpdateRequest {
  id: number;
  groupId: number;
  name?: string;
  description?: string;
  deadline?: string;
  completed?: boolean;
}
