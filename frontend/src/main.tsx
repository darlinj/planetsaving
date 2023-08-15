import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Container from "@mui/material/Container";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Container maxWidth="md">
          <App />
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
