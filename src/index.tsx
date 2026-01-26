import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthModalProvider } from "./user/providers/AuthModalContext.tsx";
import { router } from "./app/router.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthModalProvider>
        <React.Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router}>

          </RouterProvider>
        </React.Suspense>{" "}
      </AuthModalProvider>
    </Provider>
  </React.StrictMode>
);
