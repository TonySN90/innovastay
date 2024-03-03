import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function Users() {
  return (
    <div className="shadow-gray-400/10 shadow-lg">
      <Heading title="Mitarbeiter" />
      <SignupForm />
    </div>
  );
}

export default Users;
