import TodoButton from "@components/atoms/TodoButton";
import TodoInput from "@components/atoms/TodoInput";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 h-screen">
      <b className="text-3xl mb-5">Login</b>
      <div className="flex flex-col items-center gap-4 border-2 border-gray-400 rounded-lg p-8">
        <TodoInput type="text" placeholder="Email" />
        <TodoInput type="password" placeholder="Password" />
        <TodoButton>Login</TodoButton>
      </div>
    </div>
  );
};

export default Login;
