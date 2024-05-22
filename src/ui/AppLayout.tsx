import { Outlet } from "react-router";
import Header from "../ui/Header";
import Main from "./Main";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import MobileNavButton from "./MobileNavButton";
import { useState } from "react";

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <MobileNavButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
