import { useSearchParams } from "react-router-dom";
import { fetchBookings } from "../features/bookings/bookingsSlice";
import { useAppDispatch } from "../store";
import { IFilterTypes, ISortTypes } from "../types/GlobalTypes";
import Button from "./Button";
import { PAGE_SIZE } from "../utils/contants";

function Pagination({
  count,
  filter,
  sortBy,
  rowsPerPage,
}: {
  count: number;
  filter: IFilterTypes;
  sortBy: ISortTypes;
  rowsPerPage: number;
}) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pages = Math.ceil(count / PAGE_SIZE);

  function setParams(page: number) {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams.toString());
  }

  function handleClickPrev() {
    if (page === 1) return;
    page--;
    setParams(page);
    dispatch(fetchBookings({ filter, sortBy, page }));
  }

  function handleClickNext() {
    if (page === pages) return;
    page++;
    setParams(page);
    dispatch(fetchBookings({ filter, sortBy, page }));
  }

  const from = page * PAGE_SIZE - 2;
  const to = from + PAGE_SIZE;

  return (
    <div className="pb-3 px-2 flex mb-2 justify-between border-b-2 border-indigo-100 text-sm">
      <div className="flex items-center gap-1">
        Buchung <span className="font-semibold">{page === 1 ? 1 : from}</span>
        bis
        <span className="font-semibold">{to}</span> von
        <span className="font-semibold">{count}</span> Ergebnissen
      </div>
      <div>
        <Button
          variation="inverted"
          content="< Zurück"
          extras="rounded-lg mr-1"
          size="sm"
          onClick={() => handleClickPrev()}
        />
        <Button
          variation="inverted"
          content="Weiter >"
          extras="rounded-lg"
          size="sm"
          onClick={() => handleClickNext()}
        />
      </div>
    </div>
  );
}

export default Pagination;
