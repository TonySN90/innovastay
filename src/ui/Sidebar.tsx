import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="hidden bg-stone-50 min-w-[15rem] w-[20%] h-[100vh] border-r-2 lg:block shadow-2xl shadow-indigo-200">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
