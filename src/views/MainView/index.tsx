import Group from "@components/Group";
import groups from "@server/groups.json";

const MainView = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="flex gap-10">
        {groups.map((group) => (
          <Group key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default MainView;
