import { IGroup } from "@models/Group";
import { createSlice } from "@reduxjs/toolkit";
import { createGroup, getGroupById, getGroupsByProjectId, resetGroups } from "./group.thunk";

export interface GroupState {
  groups: IGroup[];
  loading: boolean;
  selectedGroup: IGroup | null;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
  selectedGroup: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetGroups, (state) => {
      state.groups = [];
      state.loading = false;
      state.selectedGroup = null;
    });

    builder
      .addCase(getGroupsByProjectId.fulfilled, (state, action: any) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addCase(getGroupsByProjectId.rejected, (state) => {
        state.groups = [];
        state.loading = false;
      })
      .addCase(getGroupsByProjectId.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(createGroup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createGroup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(getGroupById.fulfilled, (state, action: any) => {
        state.selectedGroup = action.payload;
        state.loading = false;
      })
      .addCase(getGroupById.rejected, (state) => {
        state.selectedGroup = null;
        state.loading = false;
      })
      .addCase(getGroupById.pending, (state) => {
        state.loading = true;
      });
  },
});

export default groupSlice.reducer;
