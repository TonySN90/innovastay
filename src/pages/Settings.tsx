import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <div className="shadow-gray-400/10 shadow-lg">
      <Heading title="Hoteleinstellungen" />
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
