import clsx from "clsx";
import { FC, ReactNode } from "react";

interface Props {
  isActive?: boolean;
  children: ReactNode;
  onClick?(): void;
}

const ToolButton: FC<Props> = ({ isActive, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(" p-1 rounded", isActive && " bg-black text-white")}>
      {children}
    </button>
  );
};

export default ToolButton;
