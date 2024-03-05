import MainContent from "./MainContent";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className=" h-full">
      <MainContent content={children} />
    </main>
  );
}

export default Main;
