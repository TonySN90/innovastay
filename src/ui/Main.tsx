import MainContent from "./MainContent";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="sm:overflow-y-scroll h-[calc(100vh-10px)] sm:h-[calc(100vh-50px)]">
      <MainContent content={children} />
    </main>
  );
}

export default Main;
