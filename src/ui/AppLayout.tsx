import { Outlet } from "react-router";
import Header from "../ui/Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
