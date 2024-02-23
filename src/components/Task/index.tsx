import Checkbox from "@components/Checkbox";
import { ITask } from "@models/Task";
import { FC, useState } from "react";

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = (props) => {
  const [completed, setCompleted] = useState(props.task.isCompleted);

  const handleTaskComplete = () => {
    setCompleted(!completed);
  };

  return (
    <div
      className="flex items-center gap-3 px-2 py-1 border-[1px] rounded-lg"
      onClick={handleTaskComplete}
    >
      <Checkbox completed={completed} />
      <b className={`${completed && "line-through"}`}>{props.task.name}</b>
      <div className="hidden">
        <p>{props.task.description}</p>
      </div>
    </div>
  );
};

export default Task;
