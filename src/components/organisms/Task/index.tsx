import Checkbox from "@components/atoms/Checkbox";
import TodoDialog from "@components/atoms/Dialog";
import GenericForm from "@components/molecules/GenericForm";
import { useAppDispatch } from "@core/store";
import { setAreYouSureDialog } from "@feature/common/common.thunk";
import {
  deleteTask,
  toggleCompletionTaskById,
  updateTaskById,
} from "@feature/task/task.thunk";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import useHover from "@hooks/useHover";
import { ITask, ITaskUpdateRequest } from "@models/Task";
import dayjs from "dayjs";
import { Ellipsis } from "lucide-react";
import { FC, Fragment, useState } from "react";

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = (props) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleComplete = () => {
    dispatch(
      toggleCompletionTaskById({
        taskId: props.task.id,
        groupId: props.task.groupId,
        currentStatus: props.task.completed,
      }),
    );
  };

  const [hovered, bind] = useHover();

  const options = ["Edit", "Delete", "About"];

  const [optionSelected, setOptionSelected] = useState(options[0]);

  const defineDialogContent = (option: string) => {
    if (option === "Edit") {
      return (
        <GenericForm
          setIsOpen={setIsOpen}
          onSubmit={(values) => {
            dispatch(
              updateTaskById({
                groupId: props.task.groupId,
                taskUpdateRequest: values as Record<string, unknown> &
                  ITaskUpdateRequest,
              }),
            );
          }}
          initialValues={
            {
              id: props.task.id,
              name: props.task.name,
              description: props.task.description,
              deadline: props.task.deadline,
            } as Record<string, unknown> & ITaskUpdateRequest
          }
          fields={[
            {
              name: "name",
              placeholder: "Task's name",
              type: "text",
              required: true,
            },
            {
              name: "description",
              placeholder: "Task's description",
              type: "text",
            },
            {
              name: "deadline",
              placeholder: "Task's deadline",
              type: "date",
            },
          ]}
          submitButtonText={"Edit Task"}
        />
      );
    }
    return (
      <div className="mt-10 text-center flex flex-col gap-4">
        <b>{props.task.name}</b>
        <i>{props.task.description}</i>
        <p>{dayjs(props.task.deadline).format("DD/MM/YYYY")}</p>
      </div>
    );
  };

  return (
    <div
      className={`flex justify-between px-2 py-1 border-[1px] rounded-lg hover:bg-gray-500/20
      ${props.task.completed && "border-gray-400"}`}
      {...bind}
    >
      <div
        className="flex items-center gap-3 cursor-pointer min-w-[80%]"
        onClick={handleToggleComplete}
      >
        <Checkbox completed={props.task.completed} />
        <b
          className={`truncate ${props.task.completed && "line-through text-gray-400"}`}
        >
          {props.task.name}
        </b>
      </div>

      <Popover className="relative flex">
        <PopoverButton
          className={`${!hovered ? "hidden opacity-0" : "opacity-100"}
            focus:outline-none items-center`}
        >
          <Ellipsis />
        </PopoverButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            className="absolute -right-3 top-6 bg-primary flex flex-col
              border-white border rounded-[6px] text-sm"
          >
            <button
              className="hover:bg-gray-500/50 w-full py-2 px-6"
              onClick={() => {
                setOptionSelected("Edit");
                setIsOpen(true);
              }}
            >
              Edit
            </button>
            <button
              className="hover:bg-gray-500/50 w-full py-2 px-6"
              onClick={() => {
                setOptionSelected("About");
                setIsOpen(true);
              }}
            >
              About
            </button>
            <button
              className="hover:bg-gray-500/50 w-full py-2 px-6"
              onClick={() => {
                dispatch(
                  setAreYouSureDialog({
                    open: true,
                    message: "Are you sure you want to delete this task?",
                    actionType: "DELETE_TASK",
                    taskId: props.task.id,
                    groupId: props.task.groupId,
                    projectId: null,
                  }),
                );
              }}
            >
              Delete
            </button>
          </PopoverPanel>
        </Transition>
      </Popover>

      <TodoDialog
        title={optionSelected}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {defineDialogContent(optionSelected)}
      </TodoDialog>
    </div>
  );
};

export default Task;
