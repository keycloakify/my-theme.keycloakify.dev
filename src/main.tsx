/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { getIsSafari } from "./tools/getIsSafari";
import { NoSafari } from "./NoSafari";
import { GlobalStyles } from "tss-react";
import { useStyles } from "tss-react/mui";

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);

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

function Root() {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <RootContextualized />
            </ThemeProvider>
        </React.StrictMode>
    );
}

function RootContextualized() {

    const { theme } = useStyles();

    return (
        <>
            <GlobalStyles styles={{
                html: {
                    ":root": {
                        colorScheme: "dark"
                    }
                },
                "html, body": {
                    margin: 0,
                    padding: 0,
                },
                body: {
                    backgroundColor: theme.palette.background.default
                }
            }} />
            {(() => {

                if (getIsSafari()) {
                    return <NoSafari />;
                }

                return <App />;

            })()}

        </>
    );

}
