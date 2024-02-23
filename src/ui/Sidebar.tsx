import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="bg-stone-50 min-w-[15rem] w-[20%] h-dvh border-r-2">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
