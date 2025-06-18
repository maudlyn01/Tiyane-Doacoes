import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About,AdminPage,Home } from "./pages/index";
import { MainLayout } from "./layout/main-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [ 
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}