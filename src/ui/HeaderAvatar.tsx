import { useAppSelector } from "../store";
import { IUserMetadataTypes } from "../types/AuthTypes";

function HeaderAvatar() {
  const { user } = useAppSelector((state) => state.auth);

  const { fullName, avatar } =
    (user?.user_metadata as IUserMetadataTypes) || {};

  return (
    <div className="flex justify-end mr-4">
      <img
        className="w-10 rounded-full mr-2"
        src={avatar || "default_avatar.png"}
        alt={`Avatar des Nutzers`}
      />
      <span className="flex justify-center items-center">
        {fullName || "Demo"}
      </span>
    </div>
  );
}

export default HeaderAvatar;
