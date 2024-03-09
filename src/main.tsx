import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { AxiosError } from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactQueryDevtools } from "react-query/devtools";

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => console.clear());
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (count, error) => {
        if ((error as AxiosError).response?.status === 403) {
          return false;
        }

        return count < 2;
      },
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <GoogleOAuthProvider clientId="723638499543-sdcn9312rg2fh0k90n2p626qvelodplb.apps.googleusercontent.com">
      <Router>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          limit={5}
          pauseOnFocusLoss={false}
          newestOnTop
        />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </GoogleOAuthProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
