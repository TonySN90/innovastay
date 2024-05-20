import Button from "./Button";
import Heading from "./Heading";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  console.log(error.message);
  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="flex flex-col justify-center items-center  px-10 h-[200px] bg-background_secondary rounded-lg">
        <Heading title="Ein Fehler ist aufgetreten 😒" size="text-2xl" />
        <p className="mb-4 text-status_red">{error.message}</p>

        <Button
          size="md"
          variation="standard"
          content="Versuche es nochmal"
          extras="rounded-lg"
          onClick={() => resetErrorBoundary()}
          //   onClick={() => navigation("/dashboard")}
        />
      </div>
    </div>
  );
}

export default ErrorFallback;
