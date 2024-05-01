import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import MiniSpinner from "../../ui/MiniSpinner";

export default function Logout() {
  const { logoutUser, logoutLoadingStatus } = useLogout();

  return (
    <ButtonIcon onClick={logoutUser}>
      {logoutLoadingStatus === "loading" ? (
        <MiniSpinner />
      ) : (
        <HiArrowRightOnRectangle className="w-6 h-6" />
      )}
    </ButtonIcon>
  );
}
