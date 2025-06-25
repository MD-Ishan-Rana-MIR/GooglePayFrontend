import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import GooglePayButton from './GooglePayButton';

const stripePromise = loadStripe('pk_test_YOUR_PUBLIC_KEY'); // Replace with your publishable key

const StripeContainer = () => {
    const [clientSecret, setClientSecret] = useState('');
    console.log(clientSecret)

    useEffect(() => {
        axios
            .post('http://localhost:5500/api/v1/create-payment-intent', {
                amount: 500, // 5.00 USD in cents
                currency: 'usd',
            })
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            })
            .catch((err) => console.error('PaymentIntent error:', err));
    }, []);

    const options = {
        clientSecret,
        appearance: { theme: 'flat' },
    };

    return clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
            <GooglePayButton clientSecret={clientSecret} />
        </Elements>
    ) : (
        <p>Loading payment form...</p>
    );
};

export default StripeContainer;
