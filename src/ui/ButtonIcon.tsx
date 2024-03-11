function ButtonIcon({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return <button onClick={onClick}>{children}</button>;
}

export default ButtonIcon;
