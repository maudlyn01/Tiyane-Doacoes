import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About,Home } from "./pages/index";
import { MainLayout } from "./layout/main-layout";
import { Intermediario } from "./pages/intermediario"

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
        path: "/intermediario",
        element: <Intermediario />,
      }
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
