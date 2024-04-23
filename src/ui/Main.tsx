import MainContent from "./MainContent";
import { Toaster } from "react-hot-toast";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="overflow-y-scroll" style={{ height: "calc(100vh - 56px)" }}>
      <div>
        <Toaster />
      </div>
      <MainContent content={children} />
    </main>
  );
}

export default Main;
