import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Banner from "../Pages/Home/Banner";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Banner
            },
            {
                path: '/login',
                Component: Login
            }
        ]
    },
]);