function ButtonIcon({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  console.log(children);
  return <button onClick={onClick}>{children}</button>;
}

export default ButtonIcon;
