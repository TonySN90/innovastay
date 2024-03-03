// Buttons-Types

export interface IButtonPropsTypes {
  onClick: () => void;
  variation: string;

  type?: "reset" | "submit" | "button";
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
