import { IGroup } from './Group';

export interface IProject {
    id: number;
    name: string;
    description: string;
    groups: IGroup[];
}

export interface IProjectRequest {
    name: string;
    description: string;
}
