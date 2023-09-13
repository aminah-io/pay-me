import { Dispatch, SetStateAction } from "react";

interface PaymentNoteProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

export default function PaymentNote({ message, setMessage }: PaymentNoteProps) {
  return (
    <div>
      <label htmlFor="payment-note" className="block text-sm font-medium leading-6 text-gray-900">
        Add a note to go with your monies:
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="payment-note"
          id="payment-note"
          placeholder="Nice things you want to say"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={''}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </div>
  )
}