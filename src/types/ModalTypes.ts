export type IModalContextTypes = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
};

export interface IModalWindowPropsTypes {
  name: string;
  children: React.ReactNode;
}
