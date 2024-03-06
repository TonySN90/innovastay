import { CgSpinnerTwoAlt } from "react-icons/cg";

function Spinner() {
  return (
    <div className=" h-[50vh] flex justify-center items-center">
      <CgSpinnerTwoAlt className="animate-spin text-7xl text-indigo-500" />
    </div>
  );
}

export default Spinner;
