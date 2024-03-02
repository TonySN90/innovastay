import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";

export default function Logout() {
  return (
    <ButtonIcon onClick={() => console.log("test")}>
      <HiArrowRightOnRectangle className="w-6 h-6" />
    </ButtonIcon>
  );
}
