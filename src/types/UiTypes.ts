// Buttons-Types

export interface IButtonPropsTypes {
  onClick: () => void;
  type: string;
  size: string;
  content: string;
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
