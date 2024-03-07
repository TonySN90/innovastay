import MainContent from "./MainContent";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full shadow-2xl shadow-indigo-300">
      <MainContent content={children} />
    </main>
  );
}

export default Main;
