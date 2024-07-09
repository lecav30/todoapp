import { IData } from '@models/Data';
import { IProject, IProjectRequest } from '@models/Project';
import { IGroupRequest } from '@models/Group';
import { ITask, ITaskRequest } from '@models/Task';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

if (!localStorage.getItem('data')) {
    localStorage.setItem('data', 'null');
}
if (!localStorage.getItem('projectIndex')) {
    localStorage.setItem('projectIndex', '0');
}
if (!localStorage.getItem('groupIndex')) {
    localStorage.setItem('groupIndex', '0');
}
if (!localStorage.getItem('taskIndex')) {
    localStorage.setItem('taskIndex', '0');
}

const storedDataString = localStorage.getItem('data');
const storedData: IData =
    storedDataString !== 'null' ? JSON.parse(storedDataString) : null;
const storedProjectIndex = parseInt(localStorage.getItem('projectIndex')!);
const storedGroupIndex = parseInt(localStorage.getItem('groupIndex')!);
const storedTaskIndex = parseInt(localStorage.getItem('taskIndex')!);

export interface DataState {
    data: IData | null;
    currentProject: IProject | null;
}

const initialState: DataState = {
    data: storedData,
    currentProject: storedData !== null ? storedData.projects[0] : null,
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        changeProject: (state, action: PayloadAction<IProject>) => {
            state.currentProject = action.payload;
        },
        addProject: (state, action: PayloadAction<IProjectRequest>) => {
            // increase the projectIndex by 1
            let projectIndex = parseInt(localStorage.getItem('projectIndex')!);
            projectIndex += 1;
            localStorage.setItem('projectIndex', projectIndex.toString());
            if (!state.data)
                state.data = {
                    projects: [],
                };
            // add the new project to the data
            state.data.projects.push({
                id: projectIndex,
                ...action.payload,
                groups: [],
            });
            localStorage.setItem('data', JSON.stringify(state.data));
            // if there is only one project, set it as the current project
            if (state.data.projects.length === 1)
                state.currentProject = state.data.projects[0];
            // changeProject(state, state.data.projects[0]);
        },
        editProject: (state, action: PayloadAction<IProjectRequest>) => {
            // if there is no current project, return
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data?.projects.find(
                (p) => p.id === state.currentProject!.id,
            );
            if (!project) return;
            // Update the project's name and description
            project.name = action.payload.name;
            project.description = action.payload.description;
            localStorage.setItem('data', JSON.stringify(state.data));
        },
        deleteProject: (state, action: PayloadAction<number>) => {
            // Remove the project from the data
            state.data.projects = state.data?.projects.filter(
                (p) => p.id !== action.payload,
            );
            // If there are no projects, set the current project to null
            if (state.data?.projects.length === 0) state.currentProject = null;
            // If the current project was deleted and exist more projects,
            // set the current project to the first project
            else state.currentProject = state.data?.projects[0];
            localStorage.setItem('data', JSON.stringify(state.data));
        },
        addGroup: (state, action: PayloadAction<IGroupRequest>) => {
            // Increase the groupIndex by 1
            let groupIndex = parseInt(localStorage.getItem('groupIndex')!);
            groupIndex += 1;
            localStorage.setItem('groupIndex', groupIndex.toString());
            // If there is no current project, return
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data?.projects.find(
                (p) => p.id === state.currentProject!.id,
            );
            if (!project) return;
            // Add the group to the found project
            project.groups.push({
                id: groupIndex,
                ...action.payload,
                tasks: [],
            });
            localStorage.setItem('data', JSON.stringify(state.data));
        },
        editGroup: (
            state,
            action: PayloadAction<{
                group_id: number;
                group_request: IGroupRequest;
            }>,
        ) => {
            // If there is no current project, return
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data?.projects.find(
                (p) => p.id === state.currentProject!.id,
            );
            if (!project) return;
            // Find the group within the project by group_id
            const group = project.groups.find(
                (g) => g.id === action.payload.group_id,
            );
            if (!group) return;
            // Update the group's name and description
            group.name = action.payload.group_request.name;
            group.description = action.payload.group_request.description;
            localStorage.setItem('data', JSON.stringify(state.data));
        },
        deleteGroup: (state, action: PayloadAction<number>) => {
            // If there is no current project, return
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data?.projects.find(
                (p) => p.id === state.currentProject!.id,
            );
            if (!project) return;
            // Remove the group from the project
            project.groups = project.groups.filter(
                (g) => g.id !== action.payload,
            );
            localStorage.setItem('data', JSON.stringify(state.data));
        },
        addTask: (state, action: PayloadAction<ITaskRequest>) => {
            // Increase the taskIndex by 1
            let taskIndex = parseInt(localStorage.getItem('taskIndex')!);
            taskIndex += 1;
            localStorage.setItem('taskIndex', taskIndex.toString());
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data?.projects.find(
                (p) => p.id === state.currentProject!.id,
            );
            if (!project) return;
            // Find the group within the project by group_id
            const group = project.groups.find(
                (g) => g.id === action.payload.group_id,
            );
            if (!group) return;
            // Add the task to the found group
            group.tasks.push({
                id: taskIndex,
                isCompleted: false,
                ...action.payload,
            });
            localStorage.setItem('data', JSON.stringify(state.data));
        },
        editTask: (
            state,
            action: PayloadAction<{
                task_id: number;
                task_request: ITaskRequest;
            }>,
        ) => {
            // If there is no current project, return
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data?.projects.find(
                (p) => p.id === state.currentProject!.id,
            );
            if (!project) return;
            // Find the group within the project by group_id
            const group = project.groups.find(
                (g) => g.id === action.payload.task_request.group_id,
            );
            if (!group) return;
            // Find the task within the group by task_id
            const task = group.tasks.find(
                (t) => t.id === action.payload.task_id,
            );
            // Update the task's name, description and deadline
            task!.name = action.payload.task_request.name;
            task!.description = action.payload.task_request.description;
            task!.deadline = action.payload.task_request.deadline;
            localStorage.setItem('data', JSON.stringify(state.data));
        },
        deleteTask: (
            state,
            action: PayloadAction<{
                group_id: number;
                task_id: number;
            }>,
        ) => {
            // If there is no current project, return
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data?.projects.find(
                (p) => p.id === state.currentProject!.id,
            );
            if (!project) return;
            // Find the group within the project by group_id
            const group = project.groups.find(
                (g) => g.id === action.payload.group_id,
            );
            if (!group) return;
            // Remove the task from the group
            group.tasks = group.tasks.filter(
                (t) => t.id !== action.payload.task_id,
            );
            localStorage.setItem('data', JSON.stringify(state.data));
        },
        completeTask: (state, action: PayloadAction<ITask>) => {
            // If there is no current project, return
            if (!state.currentProject) return;
            // Find the project by ID
            const project = state.data?.projects.find(
                (p) => p.id === state.currentProject!.id,
            );
            if (!project) return;
            // Find the group within the project by group_id
            const group = project.groups.find(
                (g) => g.id === action.payload.group_id,
            );
            if (!group) return;
            // Find the task within the group by task_id
            const task = group.tasks.find((t) => t.id === action.payload.id);
            if (!task) return;
            // Toggle the task's isCompleted property
            task.isCompleted = !task.isCompleted;
            localStorage.setItem('data', JSON.stringify(state.data));
        },
    },
});

export const {
    changeProject,
    addProject,
    editProject,
    deleteProject,
    addGroup,
    editGroup,
    deleteGroup,
    addTask,
    editTask,
    deleteTask,
    completeTask,
} = dataSlice.actions;

export default dataSlice.reducer;
