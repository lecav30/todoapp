import { IData } from '@models/Data';
import { IProject, IProjectRequest } from '@models/Project';
import { IGroupRequest } from '@models/Group';
import { ITaskRequest } from '@models/Task';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import data from '@server/data.json';

export interface DataState {
    data: IData;
    projectIndex: number;
    groupIndex: number;
    taskIndex: number;
    currentProject: IProject;
}

const initialState: DataState = {
    projectIndex: 1,
    groupIndex: 2,
    taskIndex: 4,
    data: {
        projects: data.projects,
    },
    currentProject: data.projects[0],
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        changeProject: (state, action: PayloadAction<IProject>) => {
            state.currentProject = action.payload;
        },
        addProject: (state, action: PayloadAction<IProjectRequest>) => {
            try {
                state.projectIndex += 1;
                state.data.projects.push({
                    id: state.projectIndex,
                    ...action.payload,
                    groups: [],
                });
            } catch (err) {
                console.error(err);
            }
        },
        addGroup: (state, action: PayloadAction<IGroupRequest>) => {
            try {
                state.groupIndex += 1;
                // Find the project by ID
                const project = state.data.projects.find(
                    (p) => p.id === state.currentProject.id,
                );
                if (!project) {
                    throw new Error('Project not found');
                }
                // Add the group to the found project
                project.groups.push({
                    id: state.groupIndex,
                    ...action.payload,
                    tasks: [],
                });
            } catch (err) {
                console.error(err);
            }
        },
        addTask: (state, action: PayloadAction<ITaskRequest>) => {
            try {
                state.taskIndex += 1;
                // Find the project by ID
                const project = state.data.projects.find(
                    (p) => p.id === state.currentProject.id,
                );
                if (!project) {
                    throw new Error('Project not found');
                }
                // Find the group within the project by group_id
                const group = project.groups.find(
                    (g) => g.id === action.payload.group_id,
                );
                if (!group) {
                    throw new Error('Group not found');
                }
                // Add the task to the found group
                group.tasks.push({
                    id: state.taskIndex,
                    isCompleted: false,
                    ...action.payload,
                });
            } catch (err) {
                console.error(err);
            }
        },
    },
});

export const { changeProject, addProject, addGroup, addTask } =
    dataSlice.actions;

export default dataSlice.reducer;
