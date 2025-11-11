import PaymentFailClient from "@/components/modules/payment/PaymentClientFail";
import { Suspense } from "react";

const PaymentFailPage = () => {
  return <Suspense fallback={<>loading.....</>}>
    <PaymentFailClient />
  </Suspense>
};

export default PaymentFailPage;