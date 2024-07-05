import { FC } from "react";

interface TodoButtonProps {
  children: React.ReactNode;
  customclass?: string;
}

const TodoButton: FC<
  TodoButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ ...props }) => {
  return (
    <button
      className={`${props.customclass} py-2 px-4 border border-white w-fit rounded-[6px]`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default TodoButton;
