import { SvgProps } from "@utils/props";
import { FC } from "react";

const SidebarOnIcon: FC<SvgProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || 128}
      height={props?.height || 128}
      viewBox="0 0 16 16"
    >
      <path
        fill={props?.fill || "black"}
        fillRule="evenodd"
        d="M2 1L1 2v12l1 1h12l1-1V2l-1-1zm12 13H7V2h7z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default SidebarOnIcon;
