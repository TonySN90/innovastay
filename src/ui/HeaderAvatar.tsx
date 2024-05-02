import { useAppSelector } from "../store";

function HeaderAvatar() {
  const { user } = useAppSelector((state) => state.auth);

  console.log(user.user_metadata);
  const { full_name, avatar } = user.user_metadata;

  return (
    <div className="flex mr-10">
      <img
        className="w-10 rounded-full mr-2"
        src={avatar || "default_avatar.png"}
        alt={`Avatar des Nutzers ${full_name}`}
      />
      <span className="flex justify-center items-center">
        {full_name || "Demo"}
      </span>
    </div>
  );
}

export default HeaderAvatar;
