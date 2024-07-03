import { RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "@feature/data/dataSlice";
import Project from "@components/Project";
import { PlusIcon } from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();

  const activeSidebar = useSelector(
    (state: RootState) => state.sidebar.activeSidebar,
  );
  const data = useSelector((state: RootState) => state.data.data);

  const addNewProject = () => {
    dispatch(
      addProject({
        name: "New Project",
        description: "Fake description",
      }),
    );
  };

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
        <button onClick={addNewProject} className="self-center">
          <PlusIcon />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
