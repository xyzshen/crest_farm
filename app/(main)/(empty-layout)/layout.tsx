import Image from "next/image";
import loginLogo from "/public/static/images/login_logo.png";

export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className='flex h-screen w-full'>
        <div className='w-[39%] min-w-[560px] h-full relative'>
            <Image src={loginLogo} layout='fill' alt="loginLogo" />
        </div>
        {children}
    </div>;
}
