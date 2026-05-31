import {
 useEffect,
 useState
} from "react";

import {
 useSearchParams
} from "react-router-dom";
import {
  verifyPayment
} from "../api/paymentApi";

import ReceiptCard from "../components/ReceiptCard";

export default function PaymentSuccess() {

 const [receipt,setReceipt] =
  useState(null);

 const [link,setLink] =
  useState("");

 const [searchParams] =
  useSearchParams();

 useEffect(()=>{

  const verifyPayment =
   async()=>{

    const reference =
     searchParams.get(
      "reference"
     );

    const response = await verifyPayment(reference);

    setReceipt(response.receipt);

    setLink(response.classroomLink);
    };

  verifyPayment();

 },[]);

 if(!receipt)
  return <h3>Loading...</h3>;

 return (
  <ReceiptCard
    receipt={receipt}
    classroomLink={link}
  />
 );
}