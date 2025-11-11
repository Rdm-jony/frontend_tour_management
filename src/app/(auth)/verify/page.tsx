import VerifyPageClient from "@/components/modules/password/VerifyPageClient";
import { Suspense } from "react";

const VerifyPage = () => {
    return <Suspense fallback={<>loading....</>}>
        <VerifyPageClient />
    </Suspense>
};

export default VerifyPage;