import TodoDialog from "@components/molecules/Dialog";
import GenericForm from "@components/molecules/GenericForm";
import Project from "@components/organisms/Project";
import { IProject, IProjectRequest } from "@models/Project";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import { toggleSidebar } from "@feature/sidebar/sidebar.slice";
import { createProject } from "@feature/project/project.thunk";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const activeSidebar = useAppSelector(
    (state: IRootState) => state.sidebar.activeSidebar,
  );
  const { projects, selectedProject } = useAppSelector(
    (state: IRootState) => state.project,
  );

  return (
    <aside
      className={`${activeSidebar ? "opacity-100" : "opacity-0 hidden"}
      absolute top-0 left-0 border-white sm:border-r-[0.5px] h-full sm:w-80 w-full px-10
      flex flex-col items-center`}
    >
      <button
        className="absolute right-5 top-10 sm:hidden"
        onClick={() => dispatch(toggleSidebar())}
      >
        <XIcon />
      </button>
      <b className="sm:py-4 pt-10 pb-2">Todoapp</b>
      <div className="flex flex-col sm:mt-20 mt-10">
        {projects?.map((project: IProject) => (
          <Project
            key={project.id}
            project={project}
            isCurrent={project.id === selectedProject?.id}
          />
        ))}
        <button
          onClick={() => setIsOpen(true)}
          className="self-center cursor-pointer"
        >
          <PlusIcon />
        </button>
      </div>
      <TodoDialog
        title="New Project"
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
        }}
      >
        <GenericForm
          setIsOpen={setIsOpen}
          onSubmit={(values) => {
            dispatch(
              createProject(
                values as Record<string, unknown> & IProjectRequest,
              ),
            );
          }}
          initialValues={
            {
              name: "",
              description: "",
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
          submitButtonText={"Create Project"}
        />
      </TodoDialog>
    </aside>
  );
};

export default Sidebar;
