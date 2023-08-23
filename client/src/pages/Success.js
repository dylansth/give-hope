// Remove the unused imports and destructuring of 'title'
// import { useEffect } from "react";
// import { useMutation } from "@apollo/client";
// import { MAKE_DONATION } from "../utils/mutations";
// import { useLocation } from "react-router-dom";

// function Success() {
//   const { state } = useLocation();
//   const { campaignId } = state; // Remove 'title' from destructuring

//   const [addDonation] = useMutation(MAKE_DONATION);

//   useEffect(() => {
//     async function saveOrder() {
//       await addDonation({
//         variables: {
//           campaignId: campaignId,
//           // amount: parseInt(amount),
//         },
//       });

//       setTimeout(() => {
//         window.location.assign("/");
//       }, 3000);
//     }

//     saveOrder();
//   }, [addDonation, campaignId]); // Add 'amount' and 'campaignId' to the dependency array

//   return (
//     <div className="text-center">
//       <h1>Success!</h1>
//       <h2>Thank you for your donation!</h2>
//       <h2>You will now be redirected to the home page</h2>
//     </div>
//   );
// }

// export default Success;


import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { MAKE_DONATION } from "../utils/mutations";
import { Link } from 'react-router-dom';

function Success() {
  const [addDonation] = useMutation(MAKE_DONATION);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const campaignId = urlSearchParams.get("campaignId");
    const amount = parseInt(urlSearchParams.get("amount"));
    const title = urlSearchParams.get("title");

    console.log(campaignId, amount, "data to donation")
    async function saveOrder() {
      await addDonation({
        variables: {
          campaignId: campaignId,
          amount: amount,
          // ... other variables
        },
      });

      // setTimeout(() => {
      //   window.location.assign("/");
      // }, 9000 ); 
  
      }

    saveOrder();
  }, [addDonation]);

  return (
    <div className="text-center">
         <div className="text-center">
      <h1>Success!</h1>
      <h2>Thank you for your donation!</h2>
      <button>
      Go back to <Link to="/">Home </Link>

      </button>
     </div>
    </div>
  );
}

export default Success;
