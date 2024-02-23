import Heading from "./Heading";
import MainContent from "./MainContent";

function Main({ children }) {
  return (
    <main className="bg-gray-100 h-[100%]">
      <Heading />
      <MainContent content={children} />
    </main>
  );
}

export default Main;
