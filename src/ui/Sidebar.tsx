import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="hidden bg-background_sidebar min-w-[15rem] w-[20%] h-[100vh] lg:block shadow-2xl shadow-indigo-200">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
