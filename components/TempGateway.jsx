import React, { useState, useCallback } from "react";
import useTempGateway from "../hooks/useTempGateway";
import { supabase as supabaseClient } from "../lib/supabaseClient";
import Model from "./Model";
import Image from "next/image";
import { BackgroundGradient } from "../components/ui/background-gradient";
import qrnew from "../public/qrnew.png";
import { useRouter } from "next/navigation";
import { useRegistration } from "../lib/RegistrationContext";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("./Spinner"), {
  loading: () => <span>Loading...</span>,
});

const TempGateway = () => {
  const router = useRouter();
  const { registrationId, email } = useRegistration();
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isOpen, onClose } = useTempGateway();

  // Event handlers with useCallback to avoid re-creation on each render
  const handleChange = useCallback((e) => setTransactionId(e.target.value));

  const onChange = useCallback(
    (open) => {
      if (!open) onClose();
    },
    [onClose]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const { error } = await supabaseClient.from("payemt_id").insert({
          registration_id: registrationId,
          upi_ref_id: transactionId,
        });

        if (error) {
          toast.error(error.message);
          return;
        } else {
          toast.success("Registration form filled successfully!");
          console.log(email);
          await fetch("/api/sendMail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emails: email }),
          });
          setIsSubmitted(true);
          router.push("/");
        }
      } catch {
        toast.error("Internal Server Error");
      } finally {
        setLoading(false);

        onClose();
      }
    },
    [transactionId, registrationId, router, onClose]
  );

  return (
    <Model
      title="Payment"
      description="Scan the QR code below for Payment, & then submit the Transaction ID!"
      onChange={onChange}
      isOpen={isOpen}
    >
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-md shadow-lg mt-3 mb-4">
        <BackgroundGradient
          className="rounded-[22px] max-w-sm p-2 sm:p-10 bg-white"
          animate={false}
        >
          <Image
            src={qrnew}
            alt="QR Code"
            width={192}
            height={192}
            className="object-cover border rounded shadow-md"
            priority // Ensures the image loads quickly
          />
        </BackgroundGradient>

        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-4">
          <div className="mb-4">
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-900"
            >
              UPI Ref ID
            </label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={transactionId}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter Transaction ID"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
            disabled={loading} // Disable to prevent double submission
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </form>

        {/* {isSubmitted && (
          <p className="mt-4 text-green-600">
            Form submitted successfully! We will get back to you shortly.
          </p>
        )} */}
      </div>
    </Model>
  );
};

export default TempGateway;
