import Heading from "../ui/Heading";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdateUserPasswordForm from "../features/authentication/UpdateUserPasswordForm";

function Account() {
  return (
    <div className="shadow-gray-400/10">
      <Heading title="Accountverwaltung" size="text-3xl" />
      <UpdateUserDataForm />
      <UpdateUserPasswordForm />
    </div>
  );
}

export default Account;
