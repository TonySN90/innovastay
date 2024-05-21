import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="hidden sm:block bg-background_secondary h-[100vh] shadow-2xl shadow-shadow">
      <div className=" xl:min-w-[16rem] xl:w-[20%] mt-[210px] xl:m-0">
        <div className="hidden xl:block w-[130px] m-auto my-10">
          <Logo />
        </div>
        <MainNav />
      </div>
    </aside>
  );
}

export default Sidebar;
