import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import GooglePay from "../components/google-pay/GooglePay";
import StripeContainer from "../page/StripeContainer";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "google-pay",
                element: <StripeContainer></StripeContainer>
            }
        ]
    }
])