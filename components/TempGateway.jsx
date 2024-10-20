import React, { useState } from "react";
import useTempGateway from "../hooks/useTempGateway";
import Model from "./Model";
import Image from "next/image";
import { BackgroundGradient } from "../components/ui/background-gradient";
import qrnew from "../public/qrnew.png";
import { useRouter } from "next/navigation";

const TempGateway = () => {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isOpen, onClose } = useTempGateway();

  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  const handlePayment = () => {
    const generatedTransactionId = "TXN123456"; // Replace with actual logic to get transaction ID
    setTransactionId(generatedTransactionId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionId) {
      setIsSubmitted(true);
    } else {
      alert("Please complete the payment first.");
    }
    router.push("/");
  };

  return (
    <Model
      title="Payment"
      description="Scan the QR code below for Payment, & then submit the Transaction ID!"
      onChange={onChange}
      isOpen={isOpen}
    >
      <div className="flex flex-col my-1 items-center justify-center p-6 bg-gray-100 rounded-md shadow-lg mt-2">
        <BackgroundGradient
          className=" rounded-[22px] max-w-sm p-2 sm:p-10 bg-white dark:bg-zinc-900"
          animate={false}
        >
          <Image
            src={qrnew}
            alt="QR Code"
            width={192} // Adjust dimensions as needed
            height={192}
            className="object-cover border rounded shadow-md"
            loading="lazy"
          />
        </BackgroundGradient>

        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-4">
          <div className="mb-4">
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-900"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter Transaction ID"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
          >
            Submit
          </button>
        </form>

        {isSubmitted && (
          <p className="mt-4 text-green-600">
            Form submitted successfully! We will get back to you shortly.
          </p>
        )}
      </div>
    </Model>
  );
};

export default TempGateway;
