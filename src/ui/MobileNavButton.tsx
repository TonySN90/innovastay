import { RxHamburgerMenu } from "react-icons/rx";
import { VscChromeClose } from "react-icons/vsc";

function MobileNavButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="sm:hidden absolute top-[22px] right-4 text-text"
    >
      {isOpen ? (
        <VscChromeClose className="w-7 h-7" />
      ) : (
        <RxHamburgerMenu className="w-7 h-7" />
      )}
    </div>
  );
}

export default MobileNavButton;
