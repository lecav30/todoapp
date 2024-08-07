import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment, ReactNode } from "react";
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
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        open={props.isOpen}
        onClose={() => props.setIsOpen(false)}
        className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 backdrop-blur-[8px]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className="max-w-lg overflow-hidden space-y-4 border bg-primary px-12 py-10
                rounded-md shadow-xl transform transition-all"
              >
                <DialogTitle className="font-bold text-center">
                  {props.title}
                </DialogTitle>
                {props.description && (
                  <Description>{props.description}</Description>
                )}
                {props.children}
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TodoDialog;
