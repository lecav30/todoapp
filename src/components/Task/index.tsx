import Checkbox from "@components/Checkbox";
import { ITask } from "@models/Task";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { completeTask } from "@feature/data/dataSlice";

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = (props) => {
  const dispatch = useDispatch();

  const handleTaskComplete = () => {
    dispatch(completeTask(props.task));
  };

  return (
    <div
      className={`flex items-center gap-3 px-2 py-1 border-[1px] rounded-lg 
      ${props.task.isCompleted && "border-gray-400"}`}
      onClick={handleTaskComplete}
    >
      <Checkbox completed={props.task.isCompleted} />
      <b
        className={`${props.task.isCompleted && "line-through text-gray-400"}`}
      >
        {props.task.name}
      </b>
    </div>
  );
};

export default Task;
