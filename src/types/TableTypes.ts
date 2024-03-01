import { Booking } from "./BookingTypes";

export interface ITableTypes {
  columns: string;
  columnSpace: {
    col1: string;
    col2: string;
    col3: string;
  };
}

export interface TableProps extends ITableTypes {
  children: React.ReactNode;
}

export interface TableHeaderProps {
  content: string[];
}

export interface TableBodyProps {
  data: Booking[];
  render: (booking: Booking) => React.ReactNode;
}
