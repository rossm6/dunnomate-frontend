import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "../core/theme";
import { createContext, useEffect, useState } from "react";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  button {
    outline: none;
    border: none;
  }


`;

const INIT_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/init";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [init, setInit] = useState();

  useEffect(() => {
    // i.e. on mount only
    
    fetch(INIT_URL, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInit(data);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`An error occured: ${error}`);
        }
      });
  }, []);

  return init ? (
    <AppContext.Provider value={{ init }}>
        <GlobalStyle/>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </AppContext.Provider>
  ) : null;
}