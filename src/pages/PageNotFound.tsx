import { useNavigate } from "react-router";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

function PageNotFound() {
  const navigation = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="flex flex-col justify-center items-center  px-10 h-[200px] bg-background_secondary rounded-lg">
        <Heading
          title="Die Seite konnte nicht gefunden werden"
          size="text-2xl"
        />

        <Button
          size="md"
          variation="standard"
          content="Zurück zur Startseite"
          extras="rounded-lg"
          onClick={() => navigation("/dashboard")}
        />
      </div>
    </div>
  );
}

export default PageNotFound;
