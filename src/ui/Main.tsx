import MainContent from "./MainContent";

function Main({ children }) {
  return (
    <main className="bg-gray-100 h-[100%]">
      <MainContent content={children} />
    </main>
  );
}

export default Main;
