import Group from "@components/Group";
import { IGroup } from "@models/Group";
import { RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "@feature/data/dataSlice";
import { PlusIcon } from "lucide-react";

export const MainView = () => {
  const dispatch = useDispatch();

  const currentProject = useSelector(
    (state: RootState) => state.data.currentProject,
  );
  const data = useSelector((state: RootState) => state.data.data);

  const addNewGroup = () => {
    dispatch(
      addGroup({
        name: "New Group",
        description: "Fake description",
      }),
    );
  };

  return (
    <div className="h-[calc(100%-60px)] flex flex-col justify-center items-center">
      <div className="flex gap-10">
        {data.projects[currentProject.id].groups.map((group: IGroup) => (
          <Group key={group.id} group={group} />
        ))}
        <button onClick={addNewGroup} className="self-start mt-3">
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default MainView;
