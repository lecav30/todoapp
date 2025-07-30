import TodoDialog from "@components/Dialog";
import GenericForm from "@components/GenericForm";
import Project from "@components/Project";
import { IProject, IProjectRequest } from "@models/Project";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IRootState, useAppSelector } from "@core/store";
import { toggleSidebar } from "@feature/sidebar/sidebar.slice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const activeSidebar = useAppSelector(
    (state: IRootState) => state.sidebar.activeSidebar,
  );

  const data: any = null;

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
        {data !== null &&
          data?.projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        <button onClick={() => setIsOpen(true)} className="self-center">
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
            /* dispatch(
              addProject(values as Record<string, unknown> & IProjectRequest),
            ); */
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
