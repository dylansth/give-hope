// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { QUERY_CHECKOUT } from "../utils/queries";
// import Auth from "../utils/auth";
// import { useLocation } from "react-router-dom"
// import { useLazyQuery } from "@apollo/client";
// import { useMutation } from '@apollo/client';
// import { MAKE_DONATION } from '../utils/mutations'; 

// const stripePromise = loadStripe("pk_test_51NhZWxJXm36fL6cJY41Jv1eir7FhiVCyFHmHjUFN9r4XGPPZo4FQ6WfTbBBLbN8tOU9Y3Q8PyGXcKeoosSQRNxWC00NHYTObft");




// function Checkout() {
//     const [makeDonation] = useMutation(MAKE_DONATION);
//     const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
//     const { state } = useLocation();
//     const { amount, title, campaignId } = state;

//     console.log(state);

//     useEffect(() => {
//         if (data) {
//             stripePromise.then((res) => {
//                 res.redirectToCheckout({ sessionId: data.checkout.session });
//             });
//         }
//     }, [data]);

//     function submitCheckout() {
//         getCheckout({
//             variables: {
//                 amount: parseInt(amount),
//             },
//         })
//         .then(response => {
//             makeDonation({
//                 variables: {
//                     campaignId: campaignId, 
//                     amount: parseInt(amount),
//                 },
//             })
//             .then(response => {
//                 console.log("Mutation", response);
//             })
//             .catch(error => {
//                 console.error('Mutation error:', error);
//             });
//         })
//         .catch(error => {
//             console.error('Checkout error:', error);
//         });
//     }
    
//     return (
//         <div className="text-center">
//             <h2>You are donating ${amount} to {title} id {campaignId}. </h2>
//             <h3>{title} is thankful for your generosity!</h3>
//             <h4>If you wish to proceed, click the button to finish the checkout.</h4>
//             {Auth.loggedIn() ? (
//                 <button className="btn btn-primary" onClick={submitCheckout}>Finish Checkout</button>
//             ) : (
//                 <p>Please login to finish your donation.</p>
//             )}
//         </div>
//     );
// }

// export default Checkout;

import React from "react";
import Auth from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NhZWxJXm36fL6cJY41Jv1eir7FhiVCyFHmHjUFN9r4XGPPZo4FQ6WfTbBBLbN8tOU9Y3Q8PyGXcKeoosSQRNxWC00NHYTObft"
);

const availablePrices = [
    
    { id: "price_1NiKNKJXm36fL6cJm847xSOw", amount: 100 }, // 1 usd
    { id: "price_1NiL6pJXm36fL6cJRq9yl1DO", amount: 200 }, // 2 usd
    { id: "price_1NiKNmJXm36fL6cJgEdKEG8T", amount: 300 }, // 3 usd
    { id: "price_1NiKNwJXm36fL6cJRNYgWNO2", amount: 500 }, // 5 usd
    { id: "price_1NiEUjJXm36fL6cJLQ2AsOFw", amount: 1000 }, //10 usd
     // Amount in cents
  
  ];

function Checkout() {
  const navigate = useNavigate(); // Use the useNavigate hook
  const { state } = useLocation();
  const { title, amount } = state;

  const handleClick = async (selectedPriceId, selectedAmount) => {
    const stripe = await stripePromise;

    const result = await stripe.redirectToCheckout({
      lineItems: [{ price: selectedPriceId, quantity: 1 }],
      mode: "payment",
      successUrl: `${window.location.origin}/success?campaignId=${state.campaignId}&amount=${selectedAmount/100}&title=${title}`,
      cancelUrl: `${window.location.origin}/cancel`, //the page is not ready
    });

    if (result.error) {
      console.error("Redirect error:", result.error);
    } else {
      // Navigate to Success with the necessary data including campaignId, title, and amount
      navigate("/success", {
        state: {
          campaignId: state.campaignId,
          amount: selectedAmount/100,
          title: title,
        },
      });
    }
  };

  return (
    <div className="text-center">
    <h2>Choose a Donation Amount for {title}</h2>
    <div className="price-buttons">
      {availablePrices.map((price) => (
        <button
          key={price.id}
          className="inline-block p-2 bg-blue-800 text-white hover:bg-blue-300 hover:text-black focus:relative tx-center m-3"
          onClick={() => handleClick(price.id, price.amount)}
        >
          Donate ${price.amount / 100}
        </button>
      ))}
    </div>
    {Auth.loggedIn() ? (
      <div>
        <p>Select an amount and proceed to Stripe to complete your donation.</p>
      </div>
    ) : (
      <p>Please login to finish your donation.</p>
    )}
  </div>
  );
}

export default Checkout;
