import { IProject } from "@models/Project";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProject } from "@feature/data/dataSlice";
import { RootState } from "@redux/store";

interface IProjectProps {
  project: IProject;
}

const Project: FC<IProjectProps> = (props) => {
  const dispatch = useDispatch();
  const currentProject = useSelector(
    (state: RootState) => state.data.currentProject,
  );

  return (
    <div
      onClick={() => dispatch(changeProject(props.project))}
      className="cursor-pointer"
    >
      <p
        className={`mb-6 text-xl text-center py-2 hover:font-medium hover:border-b
        ${currentProject.id === props.project.id && "border-b"}`}
      >
        {props.project.name}
      </p>
    </div>
  );
};

export default Project;
