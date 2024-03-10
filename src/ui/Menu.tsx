// import { createContext, useContext, useState } from "react";
// import ButtonIcon from "./ButtonIcon";
// import { HiListBullet } from "react-icons/hi2";

import { HiEllipsisVertical } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { createContext, useContext, useState } from "react";

// const MenuContext = createContext(undefined);

// function Menu({ children }) {
//   const [openId, setIsOpenId] = useState("");

//   const close = () => setIsOpenId("");
//   const open = setIsOpenId;

//   return (
//     <MenuContext.Provider value={{ openId, close, open }}>
//       <div className="flex justify-center items-center bg-red-300">
//         {children}
//       </div>
//     </MenuContext.Provider>
//   );
// }

// function ToggleButton({ id }) {
//   const { close, open, openId } = useContext(MenuContext);

//   function handleClick(e) {
//     e.stopPropagation();
//     console.log(openId);

//     openId === "" || openId !== id ? open(id) : close();
//   }

//   return (
//     <ButtonIcon onClick={handleClick}>
//       <HiListBullet className="w-6 h-6" />
//     </ButtonIcon>
//   );
// }

// function List({ id, children }) {
//   return <ul className="absolute top-0 left-0 ">{children}</ul>;
// }

// function Button({ id, children }) {
//   return <li className="p-3">{children}</li>;
// }

// Menu.ToggleButton = ToggleButton;
// Menu.List = List;
// Menu.Button = Button;
// export default Menu;
// //

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

    if (openId === "" || openId !== cabinId) {
      open(cabinId);
    } else {
      close();
    }
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({ x: rect.x - rect.width - 45, y: rect.y + 50 });
  }

  return (
    <ButtonIcon onClick={handleClick}>
      <HiEllipsisVertical className="w-7 h-7" />
    </ButtonIcon>
  );
}

function List({ children }) {
  const { position } = useContext(MenuContext);

  return (
    <div
      style={{
        position: position ? "absolute" : "static",
        top: position && position.y,
        left: position && position.x,
      }}
      className="z-10"
    >
      <ul>{children}</ul>
    </div>
  );
}

function Item({ children }) {
  const { openId } = useContext(MenuContext);

  if (openId === "") return null;
  return <li className="bg-blue-300 px-3 py-1.5 cursor-pointer">{children}</li>;
}

Menu.List = List;
Menu.Item = Item;
Menu.ToggleButton = ToggleButton;

export default Menu;
