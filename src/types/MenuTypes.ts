export interface IMenuTypes {
  close: () => void;
  open: (name: number) => void;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  openId: number;
}
