import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import GooglePayButton from './GooglePayButton';

const stripePromise = loadStripe('pk_test_51QVkpsGBxMAp0jzpOqaZL5i7NL6mzV14z72Z9896jHiSCmhzRd7RjoVoa0kmKvIbkA2M0Gp9kmjudDQXKHqK9U7e00MrQBs8AL');

const StripeContainer = () => {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Call your backend to create a PaymentIntent
        axios
            .post('https://google-pay-backend-sandy.vercel.app/api/v1/create-payment-intent', {
                amount: 500, // 5.00 USD in cents
                currency: 'usd',
            })
            .then((res) => {
                console.log(res)
                setClientSecret(res.data.clientSecret);
            })
            .catch((err) => {
                console.error('Error creating PaymentIntent:', err);
            });
    }, []);

    const appearance = {
        theme: 'flat',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
            <GooglePayButton />
        </Elements>
    ) : (
        <p>Loading payment...</p>
    );
};

export default StripeContainer;
