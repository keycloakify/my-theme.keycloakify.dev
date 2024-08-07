import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { getIsSafari } from "./tools/getIsSafari";
import { NoSafari } from "./NoSafari";

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#000000",
            paper: "#111111"
        },
        text: {
            primary: "#EDEDED",
            secondary: "#A1A1A1"
        },
    },
    typography: {
        fontFamily: "Geist"
    }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            {(() => {

                if (getIsSafari()) {
                    return <NoSafari />;
                }

                return <App />;

            })()}
        </ThemeProvider>
    </React.StrictMode>
);
