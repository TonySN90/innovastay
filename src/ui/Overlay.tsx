function Overlay({ children }) {
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] z-10 backdrop-blur-sm transition-all">
      {children}
    </div>
  );
}

export default Overlay;