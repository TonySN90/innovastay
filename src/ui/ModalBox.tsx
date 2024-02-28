function ModalBox({ children }) {
  return (
    <div className="fixed top-[50%] left-[50%] border-2 border-indigo-300 rounded-md bg-slate-100 translate-x-[-50%] translate-y-[-50%] mx-auto p-3">
      {children}
    </div>
  );
}

export default ModalBox;
