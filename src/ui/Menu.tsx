import { HiEllipsisVertical } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "../hooks/useClickOutside";
import { IMenuTypes } from "../types/MenuTypes";
import useWindowWidth from "../hooks/UseWindowWidth";

const MenuContext = createContext({} as IMenuTypes);

function Menu({ children }: { children: React.ReactNode }) {
  const [openId, setIsOpenId] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setIsOpenId(0);
  const open = setIsOpenId;

  return (
    <MenuContext.Provider
      value={{ close, open, openId, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function ToggleButton({ id }: { id: number }) {
  const { close, open, openId, setPosition }: IMenuTypes =
    useContext(MenuContext);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    const rect = (e.target as Element)
      .closest("button")
      ?.getBoundingClientRect();
    if (rect) setPosition({ x: rect.x - rect.width - 120, y: rect.y + 45 });

    openId === 0 || openId !== id ? open(id) : close();
  }

  return (
    <ButtonIcon onClick={handleClick}>
      <HiEllipsisVertical className="w-7 h-7" />
    </ButtonIcon>
  );
}

function List({ children, id }: { children: React.ReactNode; id: number }) {
  const { position, close, openId } = useContext(MenuContext);
  const windowWidth = useWindowWidth();

  const ref = useClickOutside(close, false);

  if (openId !== id) return null;

  if (windowWidth < 640)
    return (
      <ul
        data-id={id}
        ref={ref}
        className="z-10 bg-menu rounded-lg w-full shadow-sm"
      >
        {children}
      </ul>
    );
  else
    return createPortal(
      <ul
        data-id={id}
        ref={ref}
        style={{
          position: position ? "absolute" : "static",
          top: position && position.y,
          left: position && position.x,
        }}
        className="z-10 bg-menu rounded-lg w-[200px] sticky top-0 shadow-sm"
      >
        {children}
      </ul>,

      document.body
    );
}

function Item({
  children,
  onClick = () => {},
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.(); // Open Modal
    close(); // Close Menu
  }

  return (
    <li className=" px-3 py-1.5 cursor-pointer" onClick={handleClick}>
      <div className="flex items-center jus gap-2 h-7 hover:text-text_hover transition-all">
        {children}
      </div>
    </li>
  );
}

Menu.List = List;
Menu.Item = Item;
Menu.ToggleButton = ToggleButton;

export default Menu;
