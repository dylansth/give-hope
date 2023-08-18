import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { QUERY_CHECKOUT } from "../utils/queries";
import Auth from "../utils/auth";
import { useLocation } from "react-router-dom"
import { useLazyQuery } from "@apollo/client";
import { useMutation } from '@apollo/client';
import { MAKE_DONATION } from '../utils/mutations'; 

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");




function Checkout() {
    const [makeDonation] = useMutation(MAKE_DONATION)
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const { state } = useLocation();
    const { amount, title, campaignId } = state;

    useEffect(() => {
        if (data) {

            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    function submitCheckout() {
        getCheckout({
            variables: {
                amount: parseInt(amount),
            },
        }).then(response => {
            makeDonation({
              variables: {
                campaignId: campaignId, 
                amount: parseInt(amount),
              },
            });
          });
        
        
        ; // I have to PASS CAMPAIGN._ID AS A PROPS
    }
    return (
        <div className="text-center">
            <h2>You are donating ${amount} to {title}. </h2>
            <h3>{title} is thankful for your generosity!</h3>
            <h4>If you wish to proceed, click the button to finish the checkout.</h4>
            {Auth.loggedIn() ? (
                <button className="btn btn-primary" onClick={submitCheckout}>Finish Checkout</button>
            ) : (
                <p>Please login to finish you donation.</p>
            )}
        </div>
    );
}

export default Checkout