import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import ModalBox from "./ModalBox";
import { HiXMark } from "react-icons/hi2";
import Overlay from "./Overlay";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  //   return cloneElement(children, { onClick: () => console.log("test") });
  return (
    <Button
      onClick={() => open(opensWindowName)}
      type="big"
      content="Zimmer hinzufügen"
    />
  );
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  console.log(openName);

  if (openName !== name) return null;
  return createPortal(
    // Overlay
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
