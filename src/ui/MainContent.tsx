function MainContent({ content }: { content: React.ReactNode }) {
  return (
    <div
      className="p-2 mt-4 w-[100%] sm:w-[90%] mx-auto "
      style={{
        maxHeight: "calc(100vh - 7rem)",
        scrollbarWidth: "thin",
        scrollbarColor: "#eef2ff #f9fafb",
      }}
    >
      {content}
    </div>
  );
}

export default MainContent;
