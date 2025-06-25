import React, { useEffect, useState } from 'react';
import {
    PaymentRequestButtonElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const GooglePayButton = ({ clientSecret }) => {
    console.log(`client secret is ${clientSecret}`)
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
                amount: 500,
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });
        console.log(`pr is ${pr}`)
        pr.canMakePayment().then((result) => {
            console.log('canMakePayment:', result); // helpful for debugging
            if (result) {
                setPaymentRequest(pr);
            } else {
                console.warn('Google Pay is not available on this device.');
            }
        }).catch((err) => { console.log(` error is ${err} `) });

        pr.on('paymentmethod', async (ev) => {
            const { error } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: ev.paymentMethod.id,
                },
                { handleActions: false }
            );

            if (error) {
                ev.complete('fail');
                console.error('Payment failed:', error.message);
                alert('Payment failed: ' + error.message);
            } else {
                ev.complete('success');
                alert('Payment successful!');
            }
        });
    }, [stripe, clientSecret]);

    if (!paymentRequest) return null;

    return (
        <div style={{ marginTop: '2rem' }}>
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
        </div>
    );
};

export default GooglePayButton;
