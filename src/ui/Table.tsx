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
      <div>
        <table className="w-full mb-2 text-sm">{children}</table>
      </div>
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
        className={`grid ${columns} bg-table_header text-left hyphens-manual p-4 px-7 gap-2 rounded-t-md border-b-2 border-border`}
      >
        {content.map((el, i) => (
          <th
            className={`flex items-center font-semibold uppercase text-text ${
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

function Footer({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
