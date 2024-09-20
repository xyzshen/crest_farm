


'use client'
import { useState } from "react";
import Footer from "./footer";
import Link from "next/link";
import Logo from "/public/static/icons/logo.svg";
import Shape from "/public/static/icons/shape.svg";
export default function ClientLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    var user: any;
    if (typeof window !== 'undefined') {
        user = window && window.sessionStorage.getItem("accountNumber");;
    }

    const [isShowQuit, setIsShowQuit] = useState(false);
    const onQuit = () => {
        if (typeof window !== 'undefined') {
            window && window.sessionStorage.removeItem("accountNumber");
        }

        location.reload();
    }
    return (
        <>
            <header className="px-[50px] bg-white shadow-home_header_shadow h-16 static top-0 z-50">
                <div className="content-area mx-auto flex h-16 flex-row justify-between">
                    <div className={"flex h-16 items-center"}>
                        <Link href="/#">
                            <Logo />
                        </Link>
                    </div>
                    <div className="flex h-16 justify-center items-center">
                        <div className="h-16 leading-[64px] cursor-pointer"><span><Link href="/strategy" className="text-[#1a1a1a]">Strategy</Link></span></div>
                        {user && <div className="h-16 leading-[64px] cursor-pointer ml-[88px]"><span><Link href="/tradingPost" className="text-[#1a1a1a]">Protfolio</Link></span></div>}
                        <div className="cursor-pointer ml-[88px] relative hidden">
                            {!user ?
                                <span className="px-[24px] py-[8px] bg-black hover:bg-[#3d3d3d] text-[#fff] cursor-pointer rounded-[14px]">
                                    <Link href={"/login"}>Sign In</Link>
                                </span> :
                                <span className="px-[24px] py-[8px] bg-black hover:bg-[#3d3d3d] text-[#fff] cursor-pointer rounded-[14px] flex items-center justify-center" onClick={() => { !isShowQuit ? setIsShowQuit(true) : setIsShowQuit(false) }}>
                                    <span>{user}</span>
                                    <span className="ml-[5px] cursor-default" ><Shape /></span>

                                </span>
                            }
                            {isShowQuit && <div className="absolute right-0 w-[100px] text-center bg-[#3c3c3c] rounded-md text-[#fff] cursor-pointer">
                                <span onClick={onQuit}>Quit</span>
                            </div>}
                        </div>

                    </div>
                </div>
            </header >
            {children}
            < Footer />
        </>
    )
}