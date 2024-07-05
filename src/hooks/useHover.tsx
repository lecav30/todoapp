import { useState, MouseEvent } from "react";

interface Bind {
  onMouseOver: (event: MouseEvent) => void;
  onMouseOut: (event: MouseEvent) => void;
}

const useHover = (): [boolean, Bind] => {
  const [hovered, setHovered] = useState(false);

  const bind: Bind = {
    onMouseOver: () => setHovered(true),
    onMouseOut: () => setHovered(false),
  };

  return [hovered, bind];
};

export default useHover;
