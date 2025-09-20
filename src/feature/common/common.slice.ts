import { createSlice } from "@reduxjs/toolkit";
import { resetAreYouSureDialog, setAreYouSureDialog } from "./common.thunk";

export interface CommonState {
  areYouSureDialog: {
    open: boolean;
    message: string;
    actionType: "DELETE_PROJECT" | "DELETE_GROUP" | "DELETE_TASK" | null;
    taskId: number | null;
    groupId: number | null;
    projectId: number | null;
  };
}

const initialState: CommonState = {
  areYouSureDialog: {
    open: false,
    message: "",
    actionType: null,
    taskId: null,
    groupId: null,
    projectId: null,
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAreYouSureDialog, (state, action) => {
      state.areYouSureDialog = action.payload;
    });
    builder.addCase(resetAreYouSureDialog, (state) => {
      state.areYouSureDialog = {
        open: false,
        message: "",
        actionType: null,
        taskId: null,
        groupId: null,
        projectId: null,
      };
    });
  },
});

export default commonSlice.reducer;
