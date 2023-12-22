import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import React from "react";

export const theme = createTheme({
    fontFamily: 'dlrg_regular, sans-serif'
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider theme={theme} forceColorScheme="light">
                <App />
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode >
);
