import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Banner from "../Pages/Home/Banner";

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
                path: "home",
                element: <h1>Home</h1>
            }
        ]
    },
]);