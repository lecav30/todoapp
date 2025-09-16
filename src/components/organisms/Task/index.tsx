import Checkbox from "@components/atoms/Checkbox";
import TodoDialog from "@components/molecules/Dialog";
import GenericForm from "@components/molecules/GenericForm";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import useHover from "@hooks/useHover";
import { ITask, ITaskRequest } from "@models/Task";
import { Ellipsis } from "lucide-react";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTaskComplete = () => {
    // dispatch(completeTask(props.task));
  };

  const [hovered, bind] = useHover();

  const options = ["Edit", "Delete", "About"];

  const [optionSelected, setOptionSelected] = useState(options[0]);

  const notify = (message: string, completed: boolean) => {
    completed ? toast.success(message) : toast.error(message);
  };

  const defineDialogContent = (option: string) => {
    if (option === "Edit") {
      return (
        <GenericForm
          setIsOpen={setIsOpen}
          onSubmit={(values) => {
            /* dispatch(
              editTask({
                task_id: props.task.id,
                task_request: values as Record<string, unknown> & ITaskRequest,
              })
            ); */
          }}
          initialValues={
            {
              name: props.task.name,
              description: props.task.description,
              deadline: props.task.deadline,
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
        <p>{props.task.deadline}</p>
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
        onClick={() => {
          handleTaskComplete();
          notify(
            `Task ${props.task.completed ? "completed" : "uncompleted"}`,
            props.task.completed,
          );
        }}
      >
        <Checkbox completed={props.task.completed} />
        <b
          className={`${props.task.completed && "line-through text-gray-400"}`}
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
                setOptionSelected("Delete");
                /* dispatch(
                  deleteTask({
                    group_id: props.task.group_id,
                    task_id: props.task.id,
                  })
                ); */
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
        setIsOpen={() => setIsOpen(false)}
      >
        {defineDialogContent(optionSelected)}
      </TodoDialog>
    </div>
  );
};

export default Task;
