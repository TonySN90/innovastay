import React, { createContext, useContext, useState } from "react";
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
      type="standard"
      size="md"
      extras="rounded-lg"
      content="Zimmer hinzufügen"
    />
  );
}

function Window({ children, name }: IModalWindowPropsTypes) {
  const { openName, close } = useContext(ModalContext) || {};

  console.log(close);

  if (openName !== name) return null;
  return createPortal(
    <Overlay>
      <ModalContent>
        <div className="absolute right-4 top-4">
          <Button
            type="inverted"
            size="sm"
            extras="rounded-full"
            onClick={close ? close : () => null}
            content={<HiXMark />}
          />
        </div>
        {children}
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
    <div className="fixed top-[50%] left-[50%] border-2 border-indigo-300 rounded-md bg-slate-100 translate-x-[-50%] translate-y-[-50%] mx-auto p-3">
      {children}
    </div>
  );
}
