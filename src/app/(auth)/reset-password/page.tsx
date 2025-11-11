import ResetPassClient from "@/components/modules/password/ResetPasswordClient";
import { Suspense } from "react";

const ResetPassPage = () => {
  return <Suspense fallback={<>loading........</>}>
    <ResetPassClient />
  </Suspense>;
};

export default ResetPassPage;