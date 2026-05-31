const {
 initializeTransaction,
 verifyTransaction
} = require(
 "../services/paystackService"
);

const {
 sendEnrollmentEmail
} = require(
 "../services/emailService"
);

exports.initializePayment =
 async(req,res)=>{

  const result =
   await initializeTransaction(
    req.body
   );

  res.json(result);
 };

exports.verifyPayment =
 async(req,res)=>{

  const result =
   await verifyTransaction(
    req.params.reference
   );

  await sendEnrollmentEmail(
   result.customer.email,
   result.metadata.name,
   result.metadata.course
  );

  res.json(result);
 };

 