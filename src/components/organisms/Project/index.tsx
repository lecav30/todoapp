import { IProject, IProjectUpdateRequest } from "@models/Project";
import { FC, Fragment, useState } from "react";
import { Ellipsis } from "lucide-react";
import useHover from "@hooks/useHover";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import TodoDialog from "@components/atoms/Dialog";
import GenericForm from "@components/molecules/GenericForm";
import { useAppDispatch } from "@core/store";
import {
  changeProject,
  updateProjectById,
} from "@feature/project/project.thunk";
import { setAreYouSureDialog } from "@feature/common/common.thunk";

interface IProjectProps {
  project: IProject;
  isCurrent: boolean;
}

const Project: FC<IProjectProps> = (props) => {
  const dispatch = useAppDispatch();
  const [hovered, bind] = useHover();

  const options = ["Edit", "Delete", "About"];

  const [optionSelected, setOptionSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const defineDialogContent = (option: string) => {
    if (option === "Edit") {
      return (
        <GenericForm
          setIsOpen={setIsOpen}
          onSubmit={(values) => {
            dispatch(
              updateProjectById(
                values as Record<string, unknown> & IProjectUpdateRequest,
              ),
            );
          }}
          initialValues={
            {
              id: props.project.id,
              name: props.project.name,
              description: props.project.description,
            } as Record<string, unknown> & IProjectUpdateRequest
          }
          fields={[
            {
              name: "name",
              placeholder: "Project's name",
              type: "text",
              required: true,
            },
            {
              name: "description",
              placeholder: "Project's description",
              type: "text",
            },
          ]}
          submitButtonText={"Edit Project"}
        />
      );
    }
    return (
      <div className="mt-10 text-center flex flex-col gap-4">
        <b>{props.project.name}</b>
        <i>{props.project.description}</i>
      </div>
    );
  };

  return (
    <div
      className={`flex items-center justify-between px-3 py-1 mb-6 min-w-52
      hover:bg-gray-500/20 hover:rounded-lg
      ${props.isCurrent && "border-b"}`}
      {...bind}
    >
      <p
        className={`text-xl py-2 cursor-pointer truncate w-[80%]
        ${hovered && "font-medium"}`}
        onClick={() => dispatch(changeProject(props.project))}
      >
        {props.project.name}
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
            className="absolute left-6 top-6 bg-primary flex flex-col
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
                    message: "Are you sure you want to delete this project?",
                    actionType: "DELETE_PROJECT",
                    projectId: props.project.id,
                    groupId: null,
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
      <TodoDialog
        title={optionSelected}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        {defineDialogContent(optionSelected)}
      </TodoDialog>
    </div>
  );
};

export default Project;
