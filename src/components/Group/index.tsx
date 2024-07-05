import TodoDialog from "@components/Dialog";
import GenericForm from "@components/GenericForm";
import Task from "@components/Task";
import { addTask } from "@feature/data/dataSlice";
import { IGroup } from "@models/Group";
import { ITaskRequest } from "@models/Task";
import { PlusIcon } from "lucide-react";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

interface GroupProps {
  group: IGroup;
}

const Group: FC<GroupProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="mb-6 text-xl text-center border-b py-2">
        {props.group.name}
      </h2>
      <div className="flex flex-col gap-4">
        {props.group.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <button onClick={() => setIsOpen(true)} className="self-center">
          <PlusIcon />
        </button>
      </div>
      <TodoDialog
        title="New Task"
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
        }}
      >
        <GenericForm
          setIsOpen={setIsOpen}
          onSubmit={(values) => {
            dispatch(addTask(values as Record<string, unknown> & ITaskRequest));
          }}
          initialValues={
            {
              group_id: props.group.id,
              name: "",
              description: "",
              deadline: "",
            } as Record<string, unknown> & ITaskRequest
          }
          fields={[
            {
              name: "name",
              placeholder: "Task's name",
              type: "text",
              required: true,
            },
            {
              name: "description",
              placeholder: "Task's description",
              type: "text",
            },
            {
              name: "deadline",
              placeholder: "Deadline",
              type: "date",
            },
          ]}
          submitButtonText={"Create Task"}
        />
      </TodoDialog>
    </div>
  );
};

export default Group;
