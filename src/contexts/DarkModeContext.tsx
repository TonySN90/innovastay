import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext({});

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("isDarkMode");
    return storedMode === "true";
  });

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(isDarkMode ? "dark" : "light");
    localStorage.setItem("isDarkMode", isDarkMode.toString());
  }, [isDarkMode]);

  function toggleDarkMode() {
    setDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      "useDarkMode muss innerhalb eines DarkModeProviders verwendet werden"
    );
  }
  return context;
};

export { DarkModeProvider, useDarkMode };
