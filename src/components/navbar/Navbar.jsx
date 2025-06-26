import React from "react";
import { Link } from "react-router-dom";
import { FaApplePay, FaGooglePay, FaCreditCard } from "react-icons/fa6";
import { SiStripe } from "react-icons/si";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
            <div className="text-xl font-bold">PayNow</div>
            <div className="flex space-x-4">
                <Link
                    to="/apple-pay"
                    className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
                >
                    <FaApplePay className="text-xl" />
                    <span className="hidden md:inline">Apple Pay</span>
                </Link>

                <Link
                    to="/google-pay"
                    className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
                >
                    <FaGooglePay className="text-xl" />
                    <span className="hidden md:inline">Google Pay</span>
                </Link>

                <Link
                    to="/card-pay"
                    className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
                >
                    <FaCreditCard className="text-xl" />
                    <span className="hidden md:inline">Card Pay</span>
                </Link>

                <Link
                    to="/stripe-pay"
                    className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
                >
                    <SiStripe className="text-xl" />
                    <span className="hidden md:inline">Stripe</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
