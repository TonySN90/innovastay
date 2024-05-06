import { LoadingTypes } from "../../types/GlobalTypes";
import MiniSpinner from "../../ui/MiniSpinner";

function InfoBox({
  children,
  color,
  title,
  content,
}: {
  children: React.ReactNode;
  color: string;
  title: string;
  content: number | string | LoadingTypes;
}) {
  return (
    <div className="h-24 w-[48%] sm:w-[48%] md:w-[23%] bg-db_infobox rounded-md shadow-shadow shadow-xl flex flex-wrap border-b-2 border-border">
      <div className="w-[40%] h-full flex justify-center items-center">
        <div
          className={`${color} w-14 h-14 rounded-full flex justify-center items-center`}
        >
          {children}
        </div>
      </div>
      <div className="w-[60%] flex flex-col justify-center">
        <div className="text-sm text-gray-500 font-semibold uppercase break-words">
          {title}
        </div>
        {content === LoadingTypes.LOADING ? (
          <MiniSpinner alignment={"left"} />
        ) : (
          <div className="text-2xl">{content}</div>
        )}
      </div>
    </div>
  );
}

export default InfoBox;
