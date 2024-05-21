import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <div className="shadow-gray-400/10 shadow-lg">
      <Heading title="Hoteleinstellungen" size="text-2xl sm:text-3xl" />
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
