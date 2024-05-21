import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function User() {
  return (
    <div className="shadow-gray-400/10 shadow-lg">
      <Heading title="Nutzerverwaltung" size="text-2xl sm:text-3xl" />
      <SignupForm />
    </div>
  );
}

export default User;
