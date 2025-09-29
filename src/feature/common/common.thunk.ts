import { createAction } from "@reduxjs/toolkit";

export const setAreYouSureDialog = createAction<{
  open: boolean;
  message: string;
  actionType: "DELETE_PROJECT" | "DELETE_GROUP" | "DELETE_TASK" | null;
  taskId: number | null;
  groupId: number | null;
  projectId: number | null;
}>("setAreYouSureDialog");

export const resetAreYouSureDialog = createAction("resetAreYouSureDialog");
