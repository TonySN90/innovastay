import MainContent from "./MainContent";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="overflow-y-scroll bg-background"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <MainContent content={children} />
    </main>
  );
}

export default Main;
