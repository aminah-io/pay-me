import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from "react";

interface PaymentInputProps {
  paymentAmount: string;
  username: string;
  setPaymentAmount: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
}

export default function PaymentInput({ paymentAmount, setPaymentAmount, username, setUsername }: PaymentInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event?.target?.value);
  };
  return (
    <div>
      <form>
        <label htmlFor="payment-amount" className="block text-sm font-medium leading-6 text-gray-900">
          PayMe here:
        </label>
        <div className="mt-2">
          <input
            type="number"
            min="0.001"
            max="100.0"
            step="0.001"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="1.34"
            aria-describedby="payment-amount-description"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </div>
        <p className="mt-1 text-xs text-gray-400 italic" id="payment-amount-description">
          Add as much as you want, but don't add too little.
        </p>

        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
          Name:
        </label>
        <div className="mt-2">
          <input
            defaultValue={username}
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Langston Hues"
            aria-describedby="username-description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <p className="mt-1 text-xs text-gray-400 italic" id="username-description">
          Tell me your name
        </p>
      </form>
    </div>
  )
}