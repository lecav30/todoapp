import AreYouSure from "@components/molecules/AreYouSure";
import { createContext, ReactNode, useContext } from "react";

interface ModalContextProps {}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ModalContext.Provider value={{}}>
      <AreYouSure />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
