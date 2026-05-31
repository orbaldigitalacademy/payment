export default function ReceiptCard({
 receipt,
 classroomLink
}) {

 return (
  <div>

   <h2>
     Payment Receipt
   </h2>

   <p>
    Reference:
    {receipt.reference}
   </p>

   <p>
    Name:
    {receipt.name}
   </p>

   <p>
    Email:
    {receipt.email}
   </p>

   <p>
    Course:
    {receipt.course}
   </p>

   <p>
    Amount:
    ₦{receipt.amount}
   </p>

   <a
    href={classroomLink}
    target="_blank"
   >
    Join Google Classroom
   </a>

  </div>
 );
}