// GooglePayButton.jsx
import React, { useEffect, useState } from 'react';
import {
    PaymentRequestButtonElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

const GooglePayButton = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        const initPayment = async () => {
            if (!stripe || !elements) return;

            // Get clientSecret from your backend
            const res = await axios.post('https://google-pay-backend-sandy.vercel.app/api/v1/create-payment-intent', {
                amount: 500,
                currency: 'usd',
            });

            const clientSecret = res.data.clientSecret;

            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Donation',
                    amount: 500,
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            // Check if Google Pay is available
            const result = await pr.canMakePayment();
            console.log('canMakePayment result:', result);

            if (result) {
                setPaymentRequest(pr);

                pr.on('paymentmethod', async (ev) => {
                    const { error } = await stripe.confirmCardPayment(
                        clientSecret,
                        { payment_method: ev.paymentMethod.id },
                        { handleActions: false }
                    );

                    if (error) {
                        ev.complete('fail');
                        alert('Payment failed!');
                        console.error(error);
                    } else {
                        ev.complete('success');
                        alert('Payment successful!');
                    }
                });
            } else {
                console.warn('Google Pay is not available on this device.');
            }
        };

        initPayment();
    }, [stripe, elements]);

    if (!paymentRequest) return null;

    return (
        <PaymentRequestButtonElement
            options={{ paymentRequest }}
            style={{
                paymentRequestButton: {
                    theme: 'dark',
                    height: '48px',
                    type: 'buy',
                },
            }}
        />
    );
};

export default GooglePayButton;
