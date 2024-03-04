import { createContext, useContext } from "react";
import {
  ITableContextTypes,
  TableBodyProps,
  TableHeaderProps,
  TableProps,
} from "../types/TableTypes";

const tableContext = createContext<ITableContextTypes | undefined>(undefined);

function Table({ children, columns, columnSpace }: TableProps) {
  return (
    <tableContext.Provider value={{ columns, columnSpace }}>
      <table
        className="w-full mb-4 text-sm shadow-lg shadow-gray-400/10"
        // data-testid="table"
      >
        {children}
      </table>
    </tableContext.Provider>
  );
}

function Header({ content }: TableHeaderProps) {
  const contextValues = useContext<ITableContextTypes | undefined>(
    tableContext
  );

  if (!contextValues) {
    return null;
  }

  const { columns, columnSpace } = contextValues;

  return (
    <thead>
      <tr
        className={`grid ${columns} text-left hyphens-manual p-3 px-5 gap-2 bg-indigo-200 rounded-t-md`}
      >
        {content.map((el, i) => (
          <th
            className={`flex items-center font-semibold uppercase text-gray-700 ${
              columnSpace[`col${i + 1}` as keyof typeof columnSpace] || ""
            }`}
            key={el}
          >
            {el}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Body<T>({ render, data }: TableBodyProps<T>) {
  return <tbody>{data.map(render)}</tbody>;
}

function Footer() {
  return;
}

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
