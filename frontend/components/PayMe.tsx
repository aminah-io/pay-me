import { useState } from "react";
import { ethers } from "ethers";
import { ConnectKitButton } from "connectkit";
import {
  useAccount,
  useNetwork,
  useBalance,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import PaymentCard from "./PaymentCard";
import { PayMeAbi } from "@/abis/PayMeAbi";
import { PacmanLoader } from "react-spinners";

const PAY_ME_CONTRACT = process.env.NEXT_PUBLIC_PAY_ME_CONTRACT;

export default function PayMe() {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string >("0.001");
  const { address, isConnecting, isDisconnected } = useAccount();

  const bigIntAmount = ethers.utils.parseUnits(paymentAmount);

  const { config, error: writeError } = usePrepareContractWrite({
    address: PAY_ME_CONTRACT as `0x${string}`,
    abi: PayMeAbi,
    functionName: "payMe",
    args: [username, message, bigIntAmount],
    onError(error) {
      console.log("🛑 ERROR SENDING OUR MONIES 🛑: ", error);
    },
  });

  const { data: writeData, write } = useContractWrite(config);

  const { isLoading: isWriteLoading, isSuccess } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  const { data, isError, isLoading, error } = useContractRead({
    address: PAY_ME_CONTRACT as `0x${string}` | undefined,
    abi: PayMeAbi,
    functionName: "getTotalPayments",
    onError(error) {
      console.error("🛑 ERROR GETTING TOTAL PAYMENTS 🛑:  ", error);
    },
  });

  const totalPayments = data as string;

  const Admin = () => {
    return (
      <div>
        {isLoading && <PacmanLoader color="#36d7b7" />}
        {isError && <p>{error?.message}</p>}
        {totalPayments && <p>{totalPayments}</p>}
      </div>
    );
  }

  const Welcome = () => {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white">A dApp for getting paid with ether monies 🤑</h2>
        <p className="text-white font-medium mt-5">Please connect your wallet to proceed.</p>
      </div>
    );
  }

  const PaymentReceipt = () => {
    return (
      <div>
        <h1>YOUR PAYMENT RECEIPT</h1>
        <p>You sent: {paymentAmount}</p>
        <p>You sent to: add address here</p>
        <p>Tx: 
          <a href={`https://sepolia.etherscan.io/tx/${writeData?.hash}`}>{writeData?.hash}</a>
        </p>
      </div>
    );
  }

  const MakingPayments = () => {
    return (
      <>
      {isWriteLoading && <PacmanLoader color="#36d7b7" />}
      {isSuccess && <PaymentReceipt />}
      {address && address !== process.env.NEXT_PUBLIC_ADMIN &&
        <>
          <PaymentCard 
            setPaymentAmount={setPaymentAmount}
            paymentAmount={paymentAmount}
            username={username}
            message={message}
            setUsername={setUsername}
            write={write}
            setMessage={setMessage}
          />
        </>
      }
      </>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="flex items-center text-5xl text-center font-semibold text-white my-20">PayMe</h1>
      {address && address === process.env.NEXT_PUBLIC_ADMIN &&
        <>
          <Admin />
        </>
      }
      <MakingPayments />
      {isConnecting && <PacmanLoader color="#36d7b7" />}
      {isDisconnected && <Welcome />}
    </div>
  );
}