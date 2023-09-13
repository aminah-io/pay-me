import { Dispatch, SetStateAction } from "react";
import PaymentInput from "./PaymentInput";
import PaymentNote from "./PaymentNote";

interface PaymentCardProps {
  paymentAmount: string;
  username: string;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setPaymentAmount: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
  write: (() => void) | undefined;
}

export default function PaymentCard({ paymentAmount, setPaymentAmount, username, setUsername, message, setMessage, write }: PaymentCardProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-10">
      <div className="mb-5">
        <PaymentInput 
          setPaymentAmount={setPaymentAmount}
          paymentAmount={paymentAmount}
          username={username}
          setUsername={setUsername}
        />
      </div>
      <div>
        <PaymentNote
          message={message}
          setMessage={setMessage} 
        />
      </div>
      <button
       type="button"
       className="mt-5 rounded-md bg-teal-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
       onClick={() => write?.()}
      >Send {paymentAmount} ETH Now!</button>
    </div>
  );
}