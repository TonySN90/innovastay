function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] z-10 backdrop-blur-sm transition-all bg-black/20">
      {children}
    </div>
  );
}

export default Overlay;
