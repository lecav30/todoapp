import TodoDialog from "@components/Dialog";
import GenericForm from "@components/GenericForm";
import Group from "@components/Group";
import { addGroup } from "@feature/data/dataSlice";
import { IGroup, IGroupRequest } from "@models/Group";
import { RootState } from "@redux/store";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const MainView = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const currentProject = useSelector(
    (state: RootState) => state.data.currentProject
  );
  const data = useSelector((state: RootState) => state.data.data);

  return (
    <div className="h-[calc(100%-60px)] flex flex-col justify-center items-center">
      <div className="flex gap-10">
        {data.projects[currentProject.id].groups.map((group: IGroup) => (
          <Group key={group.id} group={group} />
        ))}
        <button onClick={() => setIsOpen(true)} className="self-start mt-3">
          <PlusIcon />
        </button>
      </div>
      <TodoDialog
        title="New Group"
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
        }}
      >
        <GenericForm
          setIsOpen={setIsOpen}
          onSubmit={(values) => {
            dispatch(
              addGroup(values as Record<string, unknown> & IGroupRequest)
            );
          }}
          initialValues={
            {
              name: "",
              description: "",
            } as Record<string, unknown> & IGroupRequest
          }
          fields={[
            {
              name: "name",
              placeholder: "Group's name",
              type: "text",
              required: true,
            },
            {
              name: "description",
              placeholder: "Group's description",
              type: "text",
            },
          ]}
          submitButtonText={"Create Group"}
        />
      </TodoDialog>
    </div>
  );
};

export default MainView;
