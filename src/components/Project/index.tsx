import { IProject, IProjectRequest } from "@models/Project";
import { FC, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProject,
  editProject,
  deleteProject,
} from "@feature/data/dataSlice";
import { RootState } from "@redux/store";
import { Ellipsis } from "lucide-react";
import useHover from "@hooks/useHover";
import { Popover, Transition } from "@headlessui/react";
import TodoDialog from "@components/Dialog";
import GenericForm from "@components/GenericForm";

interface IProjectProps {
  project: IProject;
}

const Project: FC<IProjectProps> = (props) => {
  const dispatch = useDispatch();

  const currentProject = useSelector(
    (state: RootState) => state.data.currentProject
  );

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
              editProject(values as Record<string, unknown> & IProjectRequest)
            );
          }}
          initialValues={
            {
              name: props.project.name,
              description: props.project.description,
            } as Record<string, unknown> & IProjectRequest
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
      ${currentProject!.id === props.project.id && "border-b"}`}
      {...bind}
    >
      <p
        className={`${
          hovered && "font-medium"
        } text-xl py-2 cursor-pointer truncate w-[80%]`}
        onClick={() => dispatch(changeProject(props.project))}
      >
        {props.project.name}
      </p>
      <Popover className="relative flex">
        <Popover.Button
          className={`${!hovered ? "hidden opacity-0" : "opacity-100"}
          focus:outline-none items-center`}
        >
          <Ellipsis />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
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
                setOptionSelected("Delete");
                dispatch(deleteProject(props.project.id));
              }}
            >
              Delete
            </button>
          </Popover.Panel>
        </Transition>
      </Popover>
      <TodoDialog
        title={optionSelected}
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
        }}
      >
        {defineDialogContent(optionSelected)}
      </TodoDialog>
    </div>
  );
};

export default Project;
