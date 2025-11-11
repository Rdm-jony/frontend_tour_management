import PaymentSuccessClient from "@/components/modules/payment/PaymentClientSuccess";
import { Suspense } from "react";

const PaymentSuccessPage = () => {
  return <Suspense fallback={<>loading...</>}>
    <PaymentSuccessClient />
  </Suspense>
};

export default PaymentSuccessPage;