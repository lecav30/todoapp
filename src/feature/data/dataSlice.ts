import { IData } from "@models/Data";
import { IProject, IProjectRequest } from "@models/Project";
import { IGroupRequest } from "@models/Group";
import { ITask, ITaskRequest } from "@models/Task";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import data from "@server/data.json";

export interface DataState {
    data: IData;
    projectIndex: number;
    groupIndex: number;
    taskIndex: number;
    currentProject: IProject | null;
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
    name: "data",
    initialState,
    reducers: {
        changeProject: (state, action: PayloadAction<IProject>) => {
            state.currentProject = action.payload;
        },
        addProject: (state, action: PayloadAction<IProjectRequest>) => {
            state.projectIndex += 1;
            state.data.projects.push({
                id: state.projectIndex,
                ...action.payload,
                groups: [],
            });
        },
        editProject: (state, action: PayloadAction<IProjectRequest>) => {
            if (!state.currentProject) return;
            const project = state.data.projects.find(
                (p) => p.id === state.currentProject!.id
            );
            if (!project) return;
            project.name = action.payload.name;
            project.description = action.payload.description;
        },
        deleteProject: (state, action: PayloadAction<number>) => {
            state.data.projects = state.data.projects.filter(
                (p) => p.id !== action.payload
            );
            if (state.data.projects.length === 0) state.currentProject = null;
            else state.currentProject = state.data.projects[0];
        },
        addGroup: (state, action: PayloadAction<IGroupRequest>) => {
            state.groupIndex += 1;
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data.projects.find(
                (p) => p.id === state.currentProject!.id
            );
            if (!project) return;
            // Add the group to the found project
            project.groups.push({
                id: state.groupIndex,
                ...action.payload,
                tasks: [],
            });
        },
        addTask: (state, action: PayloadAction<ITaskRequest>) => {
            state.taskIndex += 1;
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data.projects.find(
                (p) => p.id === state.currentProject!.id
            );
            if (!project) return;
            // Find the group within the project by group_id
            const group = project.groups.find(
                (g) => g.id === action.payload.group_id
            );
            if (!group) return;
            // Add the task to the found group
            group.tasks.push({
                id: state.taskIndex,
                isCompleted: false,
                ...action.payload,
            });
        },
        completeTask: (state, action: PayloadAction<ITask>) => {
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data.projects.find(
                (p) => p.id === state.currentProject!.id
            );
            if (!project) return;
            // Find the group within the project by group_id
            const group = project.groups.find(
                (g) => g.id === action.payload.group_id
            );
            if (!group) return;
            // Find the task within the group by task_id
            const task = group.tasks.find((t) => t.id === action.payload.id);
            if (!task) return;
            // Toggle the task's isCompleted property
            task.isCompleted = !task.isCompleted;
        },
    },
});

export const {
    changeProject,
    addProject,
    editProject,
    deleteProject,
    addGroup,
    addTask,
    completeTask,
} = dataSlice.actions;

export default dataSlice.reducer;
