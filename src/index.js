import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "slick-carousel/slick/slick.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from 'react-hot-toast';
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * (60 * 1000),
      refetchOnWindowFocus: false,
    },
  },
});
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      {" "}
      <Toaster />
      <App />
    </QueryClientProvider>
  </>
);
