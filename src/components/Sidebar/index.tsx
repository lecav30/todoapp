import TodoDialog from "@components/Dialog";
import GenericForm from "@components/GenericForm";
import Project from "@components/Project";
import { addProject } from "@feature/data/dataSlice";
import { IProjectRequest } from "@models/Project";
import { RootState } from "@redux/store";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const activeSidebar = useSelector(
    (state: RootState) => state.sidebar.activeSidebar
  );
  const data = useSelector((state: RootState) => state.data.data);

  return (
    <aside
      className={`${activeSidebar ? "opacity-100" : "opacity-0 hidden"}
      absolute top-0 left-0 border-white border-r-[0.5px] h-full w-80 px-10
      flex flex-col items-center`}
    >
      <b className="py-4">Todoapp</b>
      <div className="flex flex-col mt-20">
        {data.projects.map((project) => (
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
            dispatch(
              addProject(values as Record<string, unknown> & IProjectRequest)
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
