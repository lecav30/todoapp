"use client";
import TodoDialog from "@components/atoms/Dialog";
import TodoButton from "@components/atoms/TodoButton";
import { useAppDispatch, useAppSelector } from "@core/store";
import { resetAreYouSureDialog } from "@feature/common/common.thunk";
import { deleteGroup } from "@feature/group/group.thunk";
import { deleteTask } from "@feature/task/task.thunk";

const AreYouSure = () => {
  const dispatch = useAppDispatch();

  const { areYouSureDialog } = useAppSelector((state) => state.common);

  const closeDialog = () => {
    dispatch(resetAreYouSureDialog());
  };

  const confirmAction = () => {
    switch (areYouSureDialog.actionType) {
      case "DELETE_GROUP":
        dispatch(
          deleteGroup({
            groupId: areYouSureDialog.groupId!,
            projectId: areYouSureDialog.projectId!,
          }),
        );
        break;
      case "DELETE_TASK":
        dispatch(
          deleteTask({
            taskId: areYouSureDialog.taskId!,
            groupId: areYouSureDialog.groupId!,
          }),
        );
        break;
      default:
        break;
    }
  };

  return (
    <TodoDialog isOpen={areYouSureDialog.open} onClose={closeDialog} title={""}>
      <p>{areYouSureDialog.message}</p>
      <div className="flex gap-5 justify-center">
        <TodoButton customclass="cursor-pointer" onClick={closeDialog}>
          Cancel
        </TodoButton>
        <TodoButton customclass="cursor-pointer" onClick={confirmAction}>
          Confirm
        </TodoButton>
      </div>
    </TodoDialog>
  );
};

export default AreYouSure;
