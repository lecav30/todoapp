export interface ITask {
    id: number;
    group_id: number;
    name: string;
    description: string;
    isCompleted: boolean;
    deadline: string;
}

export interface ITaskRequest {
    group_id: number;
    name: string;
    description: string;
    deadline: string;
}
