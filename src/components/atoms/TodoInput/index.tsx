import { FC } from "react";

const TodoInput: FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = (props) => {
  return (
    <input
      className="bg-transparent rounded-[6px] border-white border text-white
      placeholder-white/30 px-4 py-2 focus:outline-none focus:ring-0"
      {...props}
    />
  );
};

export default TodoInput;
