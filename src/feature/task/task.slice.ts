import { ITask } from "@models/Task";
import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksByGroupId,
  toggleCompletionTaskById,
  updateTaskById,
} from "./task.thunk";

export interface TaskState {
  tasksByGroupId: {
    [groupId: number]: ITask[];
  };
  loading: boolean;
  selectedTask: ITask | null;
}

const initialState: TaskState = {
  tasksByGroupId: {},
  loading: false,
  selectedTask: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksByGroupId.fulfilled, (state, action: any) => {
        state.tasksByGroupId[action.payload.groupId] = action.payload.tasks;
        state.loading = false;
      })
      .addCase(getTasksByGroupId.rejected, (state) => {
        state.tasksByGroupId = {};
        state.loading = false;
      })
      .addCase(getTasksByGroupId.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(createTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(getTaskById.fulfilled, (state, action: any) => {
        state.selectedTask = action.payload;
        state.loading = false;
      })
      .addCase(getTaskById.rejected, (state) => {
        state.selectedTask = null;
        state.loading = false;
      })
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(updateTaskById.fulfilled, (state, action: any) => {
        state.loading = false;
      })
      .addCase(updateTaskById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTaskById.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(toggleCompletionTaskById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleCompletionTaskById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleCompletionTaskById.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      });
  },
});

export default taskSlice.reducer;
