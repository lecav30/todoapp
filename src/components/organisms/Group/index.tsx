import TodoDialog from "@components/atoms/Dialog";
import GenericForm from "@components/molecules/GenericForm";
import Task from "@components/organisms/Task";
import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import { setAreYouSureDialog } from "@feature/common/common.thunk";
import { updateGroupById } from "@feature/group/group.thunk";
import { createTask, getTasksByGroupId } from "@feature/task/task.thunk";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import useHover from "@hooks/useHover";
import { IGroup, IGroupUpdateRequest } from "@models/Group";
import { ITask, ITaskRequest } from "@models/Task";
import { Ellipsis, PlusIcon } from "lucide-react";
import { FC, Fragment, useEffect, useState } from "react";

interface GroupProps {
  group: IGroup;
}

const Group: FC<GroupProps> = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useAppDispatch();

  const [hovered, bind] = useHover();

  const options = ["Edit", "Delete", "About"];

  const [optionSelected, setOptionSelected] = useState(options[0]);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const { tasksByGroupId } = useAppSelector((state: IRootState) => state.task);

  useEffect(() => {
    dispatch(getTasksByGroupId(props.group.id));
  }, []);

  useEffect(() => {
    if (tasksByGroupId[props.group.id]) {
      setTasks(tasksByGroupId[props.group.id]);
    }
  }, [tasksByGroupId]);

  const defineDialogContent = (option: string) => {
    if (option === "Edit") {
      return (
        <GenericForm
          setIsOpen={setShowMenu}
          onSubmit={(values) => {
            dispatch(
              updateGroupById({
                projectId: props.group.projectId,
                groupUpdateRequest: values as Record<string, unknown> &
                  IGroupUpdateRequest,
              }),
            );
          }}
          initialValues={
            {
              id: props.group.id,
              name: props.group.name,
              description: props.group.description,
            } as Record<string, unknown> & IGroupUpdateRequest
          }
          fields={[
            {
              name: "name",
              placeholder: "Group's name",
              type: "text",
              required: true,
            },
            {
              name: "description",
              placeholder: "Group's description",
              type: "text",
            },
          ]}
          submitButtonText={"Edit Group"}
        />
      );
    }
    return (
      <div className="mt-10 text-center flex flex-col gap-4">
        <b>{props.group.name}</b>
        <i>{props.group.description}</i>
      </div>
    );
  };

  return (
    <div>
      <div
        className="flex items-center justify-between px-3 py-1 border-b mb-6 min-w-52
        hover:bg-gray-500/20 hover:rounded-lg"
        {...bind}
      >
        <p
          className={`${
            hovered && "font-medium"
          } text-xl py-2 cursor-pointer truncate w-[80%]`}
        >
          {props.group.name}
        </p>
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
              className="absolute -right-3 top-8 bg-primary flex flex-col
              border-white border rounded-[6px] text-sm"
            >
              <button
                className="hover:bg-gray-500/50 w-full py-2 px-6"
                onClick={() => {
                  setOptionSelected("Edit");
                  setShowMenu(true);
                }}
              >
                Edit
              </button>
              <button
                className="hover:bg-gray-500/50 w-full py-2 px-6"
                onClick={() => {
                  setOptionSelected("About");
                  setShowMenu(true);
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
                      message: "Are you sure you want to delete this group?",
                      actionType: "DELETE_GROUP",
                      groupId: props.group.id,
                      projectId: props.group.projectId,
                      taskId: null,
                    }),
                  );
                }}
              >
                Delete
              </button>
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>

      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <button
          onClick={() => setShowAdd(true)}
          className="self-center cursor-pointer"
        >
          <PlusIcon />
        </button>
      </div>

      <TodoDialog
        title={optionSelected}
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
      >
        {defineDialogContent(optionSelected)}
      </TodoDialog>

      <TodoDialog
        title="New Task"
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
      >
        <GenericForm
          setIsOpen={setShowAdd}
          onSubmit={(values) => {
            dispatch(
              createTask(values as Record<string, unknown> & ITaskRequest),
            );
          }}
          initialValues={
            {
              groupId: props.group.id,
              name: "",
              description: "",
              deadline: "",
            } as Record<string, unknown> & ITaskRequest
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
              placeholder: "Deadline",
              type: "date",
            },
          ]}
          submitButtonText="Create Task"
        />
      </TodoDialog>
    </div>
  );
};

export default Group;
