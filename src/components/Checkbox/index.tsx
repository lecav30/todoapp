import { FC } from "react";

interface CheckboxProps {
  completed: boolean;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <div>
      <div
        className={`flex justify-center items-center w-4 h-4 border-[1px] rounded-full 
        ${props.completed && "border-gray-400"}`}
      >
        <div
          className={`w-2 h-2 rounded-full bg-gray-400 ${
            !props.completed && "hidden"
          }`}
        />
      </div>
    </div>
  );
};

export default Checkbox;
