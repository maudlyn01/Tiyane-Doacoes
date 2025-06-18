import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About,Home, Login} from "./pages/index";
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
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
