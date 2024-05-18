import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="hidden bg-background_secondary min-w-[16rem] w-[20%] h-[100vh] lg:block shadow-2xl shadow-shadow">
      <div className="w-[130px] m-auto my-10">
        <Logo />
      </div>
      <MainNav />
    </aside>
  );
}

export default Sidebar;
