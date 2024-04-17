import { CgSpinnerTwoAlt } from "react-icons/cg";

function MiniSpinner() {
  return (
    <div className="p-6 flex justify-center items-center">
      <CgSpinnerTwoAlt className="animate-spin text-4xl text-indigo-500" />
    </div>
  );
}

export default MiniSpinner;
