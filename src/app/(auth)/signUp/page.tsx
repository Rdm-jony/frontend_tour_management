import RegisterForm from "@/components/modules/Auth/RegisterForm";
import Image from "next/image";
import SignInImage from "@/assets/signin-image.webp"
import Link from "next/link";


const page = () => {
    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-2 items-center gap-y-4 h-full">
            <div className="max-md:order-1 relative lg:col-span-3 md:h-screen w-full bg-[#000842] md:rounded-tr-xl md:rounded-br-xl lg:p-12 p-8">
                <Image src={SignInImage} fill className="lg:w-2/3 w-full h-full object-contain block mx-auto" alt="login-image" />
            </div>

            <div className="lg:col-span-2 w-full p-8 max-w-lg max-md:max-w-lg mx-auto">
                <div className="mb-8">
                    <h1 className="text-slate-900 text-3xl font-bold">Sign in</h1>
                    <p className="text-[15px] mt-6 text-slate-600">Already have an account <Link href="/signIn" className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap">LogIn here</Link></p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
};

export default page;