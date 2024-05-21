import MainContent from "./MainContent";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="overflow-y-scroll"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <MainContent content={children} />
    </main>
  );
}

export default Main;
