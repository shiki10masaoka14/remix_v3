import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  VFC,
} from "react";

type PROPS = {
  children: ReactNode;
};
type CONTEXT = {
  showModal: boolean;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext({} as CONTEXT);

export const ModalProvider: VFC<PROPS> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{ showModal, setShowModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
