// Buttons-Types

export interface IButtonPropsTypes {
  onClick: () => void;
  type: string;
  size: string;
  content: string | React.ReactNode;
  extras: string;
}
export type ButtonTypes = {
  basics: string;
  md: string;
  lg: string;
  standard: string;
  inverted: string;
  [key: string]: string;
};
