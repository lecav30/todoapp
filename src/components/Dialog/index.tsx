import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ReactNode } from "react";
import { FC } from "react";

interface TodoDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: ReactNode;
  title: string;
  description?: string;
}

const TodoDialog: FC<TodoDialogProps> = ({ ...props }) => {
  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={() => props.setIsOpen(false)}
        className="relative z-50 focus:outline-none"
      >
        <div
          className="fixed inset-0 flex w-screen overflow-y-auto items-center justify-center p-4
          bg-transparent backdrop-blur-[8px]"
        >
          <DialogPanel className="max-w-lg space-y-4 border bg-primary px-12 py-10 rounded-md">
            <DialogTitle className="font-bold text-center">
              {props.title}
            </DialogTitle>
            {props.description && (
              <Description>{props.description}</Description>
            )}
            {props.children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default TodoDialog;
