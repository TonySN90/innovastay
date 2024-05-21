import { Outlet } from "react-router";
import Header from "../ui/Header";
import Main from "./Main";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

function AppLayout() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
      <MobileNav />
    </>
  );
}

export default AppLayout;
