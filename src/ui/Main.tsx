import MainContent from "./MainContent";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-gray-100 h-full">
      <MainContent content={children} />
    </main>
  );
}

export default Main;
