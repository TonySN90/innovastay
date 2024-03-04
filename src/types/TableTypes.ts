export interface ITableContextTypes {
  columns: string;
  columnSpace: {
    col1: string | null;
    col2: string | null;
    col3: string | null;
    col4: string | null;
  };
}

export interface TableProps extends ITableContextTypes {
  children: React.ReactNode;
}

export interface TableHeaderProps {
  content: string[];
}

export interface TableBodyProps<T> {
  render: (item: T) => React.ReactNode;
  data: T[];
}
