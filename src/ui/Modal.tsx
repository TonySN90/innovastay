import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { HiXMark } from "react-icons/hi2";
import Overlay from "./Overlay";
import {
  IModalContextTypes,
  IModalWindowPropsTypes,
} from "../types/ModalTypes";

const ModalContext = createContext<IModalContextTypes | undefined>(undefined);

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName }: { opens: string }) {
  const { open } = useContext(ModalContext) || {};

  return (
    <Button
      onClick={() => open?.(opensWindowName)}
      type="button"
      variation="standard"
      size="lg"
      extras="rounded-lg"
      content="Zimmer hinzufügen"
    />
  );
}

function Window({ children, name }: IModalWindowPropsTypes) {
  const { openName, close } = useContext(ModalContext) || {};

  if (openName !== name) return null;
  return createPortal(
    <Overlay>
      <ModalContent>
        <div className="absolute right-4 top-4">
          <Button
            variation="inverted"
            size="sm"
            extras="rounded-full"
            onClick={close ? close : () => null}
            content={<HiXMark />}
          />
        </div>
        <div>
          {cloneElement(children as React.ReactElement, {
            onCloseModal: close,
          })}
        </div>
      </ModalContent>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

function ModalContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 overflow-auto ">
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[90vw] sm:w-[80vw] md:w-[760px]">
        <div className="mx-auto p-3 max-h-[80vh] overflow-auto bg-gray-50 border border-indigo-300 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
