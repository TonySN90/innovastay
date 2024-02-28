import { useState } from "react";

function MainContent({ content }) {
  const [bookingsView, setBookingsView] = useState("schedule");

  function handleClick(buttonType) {
    setBookingsView(buttonType);
  }

  return <div className="p-2 mt-4 w-[100%] sm:w-[90%] mx-auto">{content}</div>;
}

export default MainContent;
