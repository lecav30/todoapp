import Task from "@components/Task";
import { IGroup } from "@models/Group";
import { FC } from "react";
import { PlusIcon } from "lucide-react";
import { addTask } from "@feature/data/dataSlice";
import { useDispatch } from "react-redux";

interface GroupProps {
  group: IGroup;
}

const Group: FC<GroupProps> = (props) => {
  const dispatch = useDispatch();

  const addNewTask = () => {
    dispatch(
      addTask({
        group_id: props.group.id,
        name: "New Task",
        description: "Fake description",
        deadline: "",
      }),
    );
  };

  return (
    <div>
      <h2 className="mb-6 text-xl text-center border-b py-2">
        {props.group.name}
      </h2>
      <div className="flex flex-col gap-4">
        {props.group.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <button onClick={addNewTask} className="self-center">
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default Group;
