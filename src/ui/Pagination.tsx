import { useLocation, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { PAGE_SIZE, PAGE_SIZE_GUESTS } from "../utils/constants";

function Pagination({ count }: { count: number }) {
  let pageSize = PAGE_SIZE;
  const location = useLocation();
  const pathName = location.pathname;
  if (pathName === "/guests") pageSize = PAGE_SIZE_GUESTS;

  const [searchParams, setSearchParams] = useSearchParams();
  let page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pages = Math.ceil(count / pageSize);

  function setParams(page: number) {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams.toString());
  }

  function handleClick(operator: string) {
    if (operator === "-") page--;
    else page++;
    setParams(page);
  }

  const from = (page - 1) * pageSize + 1;
  const to = from + pageSize - 1;

  return (
    <div className="pb-3 px-2 flex mb-2 justify-between border-b-2 border-border text-sm">
      <div className="flex items-center gap-1">
        Ergebnisse <span className="font-semibold">{from}</span>
        bis
        <span className="font-semibold">{count > to ? to : count}</span> von
        <span className="font-semibold">{count}</span> Ergebnissen
      </div>
      <div>
        <Button
          content="< Zurück"
          extras="rounded-lg mr-1 text-indigo-500 hover:text-indigo-700 transition-all"
          size="sm"
          onClick={() => handleClick("-")}
          disabled={page === 1}
        />
        <Button
          content="Weiter >"
          extras="rounded-lg text-indigo-500 hover:text-indigo-700 transition-all"
          size="sm"
          onClick={() => handleClick("+")}
          disabled={page === pages}
        />
      </div>
    </div>
  );
}

export default Pagination;
