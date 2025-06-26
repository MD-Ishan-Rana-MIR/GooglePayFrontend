import GooglePayButton from '@google-pay/button-react';
import React from 'react';

const GooglePay = () => {
    return (
        <GooglePayButton
            environment="PRODUCTION"
            buttonColor="black"
            buttonType="pay"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: "CARD",
                        parameters: {
                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                            allowedCardNetworks: ["VISA", "MASTERCARD"],
                        },
                        tokenizationSpecification: {
                            type: "PAYMENT_GATEWAY",
                            parameters: {
                                gateway: "stripe",
                                gatewayMerchantId: "your_stripe_merchant_id", // ✅ লাইভ আইডি
                            },
                        },
                    },
                ],
                merchantInfo: {
                    merchantName: "Your Business Name",
                },
                transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPrice: "20.00",
                    currencyCode: "USD",
                },
            }}
            onLoadPaymentData={(paymentData) => {
                console.log("✅ Payment Loaded", paymentData);
            }}
            onPaymentAuthorized={(paymentData) => {
                console.log("✅ Payment Authorized", paymentData);
                return { transactionState: "SUCCESS" };
            }}
            onError={(err) => {
                console.error("❌ Google Pay Error", err);
            }}
        />
    );
};

export default GooglePay;
