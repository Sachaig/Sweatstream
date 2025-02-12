import { CookiesProvider } from "react-cookie";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import RegisterPage from "./pages/RegisterPage";
import Viewing from "./pages/ViewingPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import { sendData, getData, sendNewVideo } from "./services/api.service";
import Dashboard from "./pages/Dashboard";
import MyAccount from "./pages/MyAccount";
import { LoggedProvider } from "./context/LoggedContext";

const dashboardLoader = async () => {
  const [tags, categories] = await Promise.all([
    getData("/api/tags").then((res) => res.json()),
    getData("/api/categories").then((res) => res.json()),
  ]);
  return { tags, categories };
};

const videoLoader = async (id) => {
  const [tags, video] = await Promise.all([
    getData("/api/tags").then((res) => res.json()),
    getData(`/api/videos/${id}`).then((res) => res.json()),
  ]);
  return { tags, video };
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => getData(`/api/categories`),
      },
      {
        path: "/category/:id",
        element: <CategoryPage />,
        loader: (req) => getData(`/api/categories/${req.params.id}`),
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: async ({ request }) => {
          const formData = Object.fromEntries(await request.formData());
          const response = await sendData("/api/users", formData);
          if (response.status === 201) return redirect("/login");
          return response;
        },
      },
      {
        path: "/login",
        element: <LoginPage />,
        action: async ({ request }) => {
          const formData = Object.fromEntries(await request.formData());
          const response = await sendData("/api/auth", formData);
          return response;
        },
      },
      {
        path: "/video/:id",
        element: <Viewing />,
        loader: ({ params }) => videoLoader(params.id),
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/account",
        element: <MyAccount />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: async ({ request }) => {
          const formData = await request.formData();
          const { token } = Object.fromEntries(formData);
          const response = await sendNewVideo("/api/videos", formData, token);
          if (response.status === 201) {
            const data = await response.json();
            return data;
          }
          return response;
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <LoggedProvider>
        <RouterProvider router={router} />
      </LoggedProvider>
    </CookiesProvider>
  </React.StrictMode>
);
