import React from 'react';
import GooglePayButton from '@google-pay/button-react';

const GooglePay = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Donate with Google Pay</h1>
            <GooglePayButton
                environment="TEST"
                buttonColor="black"
                buttonType="donate"
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                            type: 'CARD',
                            parameters: {
                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                allowedCardNetworks: ['VISA', 'MASTERCARD'],
                            },
                            tokenizationSpecification: {
                                type: 'PAYMENT_GATEWAY',
                                parameters: {
                                    gateway: 'stripe',
                                    gatewayMerchantId: 'example', // MUST be 'example' in TEST mode
                                },
                            },
                        },
                    ],
                    merchantInfo: {
                        merchantName: 'Demo Charity',
                    },
                    transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPrice: '10.00',
                        currencyCode: 'USD',
                        // Removed countryCode to avoid error in test mode
                    },
                }}
                onLoadPaymentData={(paymentData) => {
                    console.log('✅ Payment Loaded:', paymentData);
                }}
                
            />
        </div>
    );
};

export default GooglePay;
