import { createContext, useContext } from "react";

const tableContext = createContext();

function Table({ children, columns, columnSpace }) {
  return (
    <tableContext.Provider value={{ columns, columnSpace }}>
      <table className="w-[100%] rounded mb-4 text-sm">{children}</table>
    </tableContext.Provider>
  );
}

function Header({ content }) {
  const { columns, columnSpace } = useContext(tableContext);
  return (
    <thead>
      <tr
        className={`grid ${columns} text-left hyphens-manual p-3 gap-4 bg-indigo-200`}
      >
        {content.map((el, i) => (
          <th
            className={`flex items-center font-semibold uppercase text-gray-700 ${
              columnSpace[i] ? columnSpace[i] : ""
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

function Body({ render, data }) {
  return <tbody>{data.map(render)}</tbody>;
}

function Footer() {
  return;
}

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
