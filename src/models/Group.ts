import { ITask } from './Task';

export interface IGroup {
    id: number;
    name: string;
    description: string;
    tasks: ITask[];
}

export interface IGroupRequest {
    name: string;
    description: string;
}
