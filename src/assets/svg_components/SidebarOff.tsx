import { SvgProps } from "@utils/props";
import { FC } from "react";

const SidebarOffIcon: FC<SvgProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || 128}
      height={props?.height || 128}
      viewBox="0 0 16 16"
    >
      <path
        fill={props?.fill || "black"}
        d="M2 1L1 2v12l1 1h12l1-1V2l-1-1zm0 13V2h4v12zm5 0V2h7v12z"
      />
    </svg>
  );
};

export default SidebarOffIcon;
