function Table({ children }) {
  return <table className="w-[100%] rounded mb-4">{children}</table>;
}

function Header({ specialStyles, content }) {
  return (
    <thead>
      <tr className="grid grid-cols-5 md:grid-cols-7 text-left hyphens-manual p-3 gap-4 bg-indigo-200">
        {content.map((el, i) => (
          <th
            className={`flex items-center font-semibold uppercase text-gray-700 ${
              specialStyles[i] ? specialStyles[i] : ""
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
