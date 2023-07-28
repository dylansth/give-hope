import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_DONATION } from "../utils/mutations";

function Success() {

  const [addDonation] = useMutation(ADD_DONATION);

  useEffect(() => {
    async function saveOrder() {

      const donation = JSON.parse(localStorage.getItem("donation"));

      await addDonation({
        variables: {
          campaignId: donation.campaignId,
          amount: parseInt(donation.amount),
          donorId: donation.donorId,
        },
      });

      localStorage.setItem("donation", JSON.stringify(""));


      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    saveOrder();
  }, [addDonation]);

  return (
    <div className="text-center">
      <h1>Success!</h1>
      <h2>Thank you for your donation!</h2>
      <h2>You will now be redirected to the home page</h2>
    </div>
  );
}

export default Success;