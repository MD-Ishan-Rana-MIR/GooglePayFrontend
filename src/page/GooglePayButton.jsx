import React, { useEffect, useState } from 'react';
import {
    PaymentRequestButtonElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const GooglePayButton = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        if (!stripe) return;

        const pr = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: 'Donation',
                amount: 500, // 5.00 USD
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });

        pr.canMakePayment().then((result) => {
            if (result) {
                setPaymentRequest(pr);
            }
        });

        // Optional: Handle result
        pr.on('paymentmethod', async (ev) => {
            const { error } = await stripe.confirmCardPayment(
                ev.paymentIntent.client_secret,
                {
                    payment_method: ev.paymentMethod.id,
                },
                { handleActions: false }
            );

            if (error) {
                ev.complete('fail');
                console.error('Payment failed:', error);
            } else {
                ev.complete('success');
                alert('Payment successful!');
            }
        });
    }, [stripe]);

    if (!paymentRequest) return null;

    return (
        <PaymentRequestButtonElement
            options={{ paymentRequest }}
            style={{
                paymentRequestButton: {
                    theme: 'dark',
                    height: '50px',
                    type: 'buy',
                },
            }}
        />
    );
};

export default GooglePayButton;
