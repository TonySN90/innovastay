import { HiEllipsisVertical } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "../hooks/useClickOutside";

const MenuContext = createContext(undefined);

function Menu({ children }) {
  const [openId, setIsOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setIsOpenId("");
  const open = setIsOpenId;

  return (
    <MenuContext.Provider
      value={{ close, open, openId, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function ToggleButton({ cabinId }) {
  const { close, open, openId, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({ x: rect.x - rect.width - 45, y: rect.y + 50 });

    openId === "" || openId !== cabinId ? open(cabinId) : close();
  }

  return (
    <ButtonIcon onClick={handleClick}>
      <HiEllipsisVertical className="w-7 h-7" />
    </ButtonIcon>
  );
}

function List({ children, cabinId }) {
  const { position, close, openId } = useContext(MenuContext);

  const ref = useClickOutside(close, false);

  if (openId !== cabinId) return null;

  return createPortal(
    <ul
      data-id={cabinId}
      ref={ref}
      style={{
        position: position ? "absolute" : "static",
        top: position && position.y,
        left: position && position.x,
      }}
      className="z-10 bg-indigo-200 rounded-lg"
    >
      {children}
    </ul>,

    document.body
  );
}

function Item({ children, onClick }) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li className=" px-3 py-1.5 cursor-pointer" onClick={handleClick}>
      <div className="flex items-center jus gap-2 h-7 hover:text-stone-100 transition-all">
        {children}
      </div>
    </li>
  );
}

Menu.List = List;
Menu.Item = Item;
Menu.ToggleButton = ToggleButton;

export default Menu;
