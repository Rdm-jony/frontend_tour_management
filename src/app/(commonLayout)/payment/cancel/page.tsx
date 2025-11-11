import PaymentCancelClient from "@/components/modules/payment/PaymentClientCancel";
import { Suspense } from "react";

const PaymentCancelPage = () => {
  return <Suspense fallback={<>loading...</>}>
    <PaymentCancelClient />
  </Suspense>
};

export default PaymentCancelPage;