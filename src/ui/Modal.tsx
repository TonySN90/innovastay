import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import ModalBox from "./ModalBox";
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
  // @ts-expect-error ModalContext is not defined
  const { open } = useContext<IModalContextTypes>(ModalContext) || {};

  //   return cloneElement(children, { onClick: () => console.log("test") });
  return (
    <Button
      onClick={() => open(opensWindowName)}
      type="standard"
      size="lg"
      content="Zimmer hinzufügen"
    />
  );
}

function Window({ children, name }: IModalWindowPropsTypes) {
  // @ts-expect-error ModalContext is not defined
  const { openName, close } = useContext<IModalContextTypes>(ModalContext);
  console.log(openName);

  if (openName !== name) return null;
  return createPortal(
    <Overlay>
      <ModalBox>
        <div className="absolute right-4 top-4">
          <Button onClick={close} content={<HiXMark />} />
        </div>
        {children}
      </ModalBox>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
