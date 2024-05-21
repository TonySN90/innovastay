import Logo from "./Logo";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

function Sidebar() {
  return (
    <aside className="bg-background_secondary h-[100vh] shadow-2xl shadow-shadow">
      <div className="hidden lg:block min-w-[16rem] w-[20%]">
        <div className="w-[130px] m-auto my-10">
          <Logo />
        </div>
        <MainNav />
      </div>
      <MobileNav />
    </aside>
  );
}

export default Sidebar;
