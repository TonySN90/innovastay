import MainContent from "./MainContent";
import { Toaster } from "react-hot-toast";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-[92vh] lg:h-full">
      <div>
        <Toaster />
      </div>
      <MainContent content={children} />
    </main>
  );
}

export default Main;
