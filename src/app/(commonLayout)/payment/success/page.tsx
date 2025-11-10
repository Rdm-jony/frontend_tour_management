"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <CheckCircle2 className="mx-auto text-green-500 w-20 h-20 mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-500 mb-6">
          {message || "Your payment was completed successfully."}
        </p>

        <div className="text-left border-t pt-4 space-y-2">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Transaction ID:</span>{" "}
            {transactionId || "N/A"}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Amount:</span>{" "}
            {amount ? `${amount} BDT` : "N/A"}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{status || "unknown"}</span>
          </p>
        </div>

        <Button
          onClick={() => router.push("/")}
          className="mt-6 w-full"
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
