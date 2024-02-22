import Heading from "./Heading";
import MainContent from "./MainContent";

function Main({ children }) {
  return (
    <main>
      <Heading />
      <MainContent content={children} />
    </main>
  );
}

export default Main;
