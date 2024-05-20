import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { OidcProvider } from "oidc";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

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
        <OidcProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </OidcProvider>
    </React.StrictMode>
);
