import Heading from "../ui/Heading";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdateUserPasswordForm from "../features/authentication/UpdateUserPasswordForm";
import useUpdateUser from "../features/authentication/useUpdateUser";

function Account() {
  return (
    <div className="shadow-gray-400/10">
      <Heading title="Accountverwaltung" size="text-3xl" />
      <UpdateUserData />
    </div>
  );
}

export default Account;

function UpdateUserData() {
  const { updateUser, isUpdating } = useUpdateUser();

  return (
    <>
      <UpdateUserDataForm updateUser={updateUser} isUpdating={isUpdating} />
      <UpdateUserPasswordForm updateUser={updateUser} isUpdating={isUpdating} />
    </>
  );
}
