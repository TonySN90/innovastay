import { ITodayCardBookingTypes } from "../../types/DashboardTypes";
import { LoadingTypes } from "../../types/GlobalTypes";
import MiniSpinner from "../../ui/MiniSpinner";
import InfoCardRow from "./InfoCardRow";

function InfoCard({
  id,
  title,
  rowContent,
}: {
  id: string;
  title: string;
  rowContent: ITodayCardBookingTypes[] | LoadingTypes;
}) {
  let border = "";
  let backgroundColor = "";
  let textColor = "";

  if (id === "arrival") {
    border = "border-green-200";
    backgroundColor = "bg-status_green";
    textColor = "text-db_arrival_icon";
  }
  if (id === "departure") {
    border = "border-yellow-200";
    backgroundColor = "bg-status_red";
    textColor = "text-db_departure_icon";
  }
  if (id === "presentGuests") {
    border = " border-indigo-200";
    backgroundColor = "bg-status_blue";
    textColor = "text-db_presentGuests_icon";
  }

  return (
    <table className={`${border} mt-2`}>
      <thead className={`block rounded-t-lg py-2 px-4 ${backgroundColor} `}>
        <tr>
          <th className="text-left h-8">{title}</th>
        </tr>
      </thead>

      <tbody className="bg-db_infobox border-b-2 border-border shadow-shadow shadow-xl">
        {rowContent === LoadingTypes.LOADING ? (
          <tr>
            <td>
              <MiniSpinner alignment="center" />
            </td>
          </tr>
        ) : rowContent.length === 0 ? (
          <tr>
            <td className="text-sm p-4">Keine Daten vorhanden</td>
          </tr>
        ) : (
          Array.isArray(rowContent) &&
          rowContent.map((el: ITodayCardBookingTypes) => (
            <InfoCardRow
              id={id}
              status={el.status}
              name={el.fullName}
              bookingId={el.id}
              // @ts-expect-error Adapt Types!!!
              cabin={el.cabins.name}
              nights={el.numNights}
              textColor={textColor}
              backgroundColor={backgroundColor}
              key={el.id}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

export default InfoCard;
