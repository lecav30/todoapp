import TodoDialog from "@components/atoms/Dialog";
import GenericForm from "@components/molecules/GenericForm";
import Group from "@components/organisms/Group";
import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import { createGroup } from "@feature/group/group.thunk";
import { IGroup, IGroupRequest } from "@models/Group";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const MainView = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { groups } = useAppSelector((state: IRootState) => state.group);
  const { selectedProject } = useAppSelector(
    (state: IRootState) => state.project,
  );

  return (
    <div className="h-[calc(100%-60px)] flex flex-col justify-center items-center">
      <div className="max-h-[80%] md:max-w-[80%] max-w-[90%] w-full h-full overflow-auto">
        <div
          className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1
          gap-10 place-content-center h-full"
        >
          {groups.map((group: IGroup) => (
            <Group key={group.id} group={group} />
          ))}
          <button
            onClick={() => setIsOpen(true)}
            className="mt-3 cursor-pointer w-fit mx-auto"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <TodoDialog
        title="New Group"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <GenericForm
          setIsOpen={setIsOpen}
          onSubmit={(values) => {
            dispatch(
              createGroup(values as Record<string, unknown> & IGroupRequest),
            );
          }}
          initialValues={
            {
              name: "",
              description: "",
              projectId: selectedProject?.id,
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
