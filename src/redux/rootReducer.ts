import sidebarReducer from "@feature/sidebar/sidebar.slice";
import projectReducer from "@feature/project/project.slice";
import groupReducer from "@feature/group/group.slice";
import taskReducer from "@feature/task/task.slice";
import authReducer from "@feature/auth/auth.slice";

const rootReducer = {
  sidebar: sidebarReducer,
  project: projectReducer,
  group: groupReducer,
  task: taskReducer,
  auth: authReducer,
};

export default rootReducer;
