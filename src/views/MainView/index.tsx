import TodoDialog from "@components/Dialog";
import GenericForm from "@components/GenericForm";
import Group from "@components/Group";
import { addGroup } from "@feature/data/dataSlice";
import { IGroup, IGroupRequest } from "@models/Group";
import { RootState } from "@redux/store";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const MainView = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const currentProject = useSelector(
    (state: RootState) => state.data.currentProject,
  );
  const data = useSelector((state: RootState) => state.data.data);

  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    // If there is no current project, set groups to an empty array
    if (!currentProject) setGroups([]);
    // Find the current project and set its groups
    const project = data.projects.find((p) => p.id === currentProject!.id);
    // If there is no project, return
    if (!project) return;
    setGroups(project.groups);
  }, [currentProject, data.projects, currentProject?.groups]);
  // Update the groups when the current project changes (deleted) or
  // the projects change (a new project is added and the projects array is empty)

  return (
    <div className="h-[calc(100%-60px)] flex flex-col justify-center items-center">
      <div
        className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1
        gap-10 max-h-[80%] md:max-w-[80%] max-w-[90%] place-items-center overflow-auto"
      >
        {groups.map((group: IGroup) => (
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
              addGroup(values as Record<string, unknown> & IGroupRequest),
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
