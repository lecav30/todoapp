import Task from "@components/Task";
import { IGroup } from "@models/Group";
import { FC } from "react";

interface GroupProps {
  group: IGroup;
}

const Group: FC<GroupProps> = (props) => {
  return (
    <div>
      <h2 className="mb-6 text-xl text-center border-b py-2">
        {props.group.name}
      </h2>
      {/* <p>{props.group.description}</p> */}
      <div className="flex flex-col gap-4">
        {props.group.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Group;
