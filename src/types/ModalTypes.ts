export type IModalContextTypes = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
  opensWindowName: string;
};

export interface IModalWindowPropsTypes {
  name: string;
  children: React.ReactNode;
}
