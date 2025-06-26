import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import GooglePay from "../components/google-pay/GooglePay";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "google-pay",
                element: <GooglePay></GooglePay>
            }
        ]
    }
])