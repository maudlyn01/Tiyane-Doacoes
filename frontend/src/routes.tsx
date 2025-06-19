import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About,AdminPage,Home,Login } from "./pages/index";
import {DeliveryConfirmation} from "./pages/confirmation"
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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path:"/intermediate",
        element:<DeliveryConfirmation/>
      }
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}