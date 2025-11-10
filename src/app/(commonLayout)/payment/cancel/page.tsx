"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCancelPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <XCircle className="mx-auto text-red-500 w-20 h-20 mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-500 mb-6">
          {message || "Your payment process was cancelled."}
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
            <span className="capitalize text-red-600">
              {status === "false" ? "Cancelled" : "Unknown"}
            </span>
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Go Back to Home
          </Button>

          <Button
            className="w-full bg-red-500 hover:bg-red-600"
            onClick={() => router.push("/tours")}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
