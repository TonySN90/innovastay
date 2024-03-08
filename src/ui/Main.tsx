import MainContent from "./MainContent";
import { Toaster } from "react-hot-toast";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-[95vh] lg:h-full shadow-2xl shadow-indigo-300">
      <div>
        <Toaster />
      </div>
      <MainContent content={children} />
    </main>
  );
}

export default Main;
