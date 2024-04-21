import { CgSpinnerTwoAlt } from "react-icons/cg";

function MiniSpinner({alignment}) {

  if (alignment === "left") alignment = "justify-start";
  if (alignment === "center") alignment = "justify-center py-6";

  return (
    <div className={`flex items-center ${alignment}`}>
      <CgSpinnerTwoAlt className="animate-spin text-3xl text-indigo-500" />
    </div>
  );
}

export default MiniSpinner;
