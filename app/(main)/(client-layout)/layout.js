


'use client'
import { useState } from "react";
import Footer from "./footer.js";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/static/images/logo.png";
import Shape from "/public/static/icons/shape.svg";
export default function ClientLayout({ children }) {
    const user = window.sessionStorage.getItem("accountNumber");
    const [isShowQuit, setIsShowQuit] = useState(false);
    const onQuit = () => {
        window.sessionStorage.removeItem("accountNumber");
        location.reload();
    }
    return (
        <>
            <header className="px-[50px] bg-white shadow-home_header_shadow h-16 static top-0 z-50">
                <div className="content-area mx-auto flex h-16 flex-row justify-between">
                    <div className={"flex h-16 items-center"}>
                        <Link href="/#">
                            <Image src={logo} width={152} height={30} alt="" />
                        </Link>
                    </div>
                    <div className="flex h-16 justify-center items-center">
                        <div className="h-16 leading-[64px] cursor-pointer"><span><Link href="/strategy" className="text-[#1a1a1a]">Strategy</Link></span></div>
                        {user && <div className="h-16 leading-[64px] cursor-pointer ml-[88px]"><span><Link href="/tradingPost" className="text-[#1a1a1a]">Protfolio</Link></span></div>}
                        <div className="cursor-pointer ml-[88px]">
                            {!user ?
                                <span className="px-[24px] py-[8px] bg-black hover:bg-[#3d3d3d] text-[#fff] cursor-pointer rounded-[14px]">
                                    <Link href={"/login"}>Sign In</Link>
                                </span> :
                                <span className="px-[24px] py-[8px] bg-black hover:bg-[#3d3d3d] text-[#fff] cursor-pointer rounded-[14px] flex items-center justify-center" onClick={() => { !isShowQuit ? setIsShowQuit(true) : setIsShowQuit(false) }}>
                                    <span>{user}</span>
                                    <span className="ml-[5px] cursor-default" ><Shape /></span>

                                </span>
                            }

                        </div>
                        {isShowQuit && <div className="absolute top-[50px] right-20 w-[50px] text-center bg-[#d3d3d3] text-[#fff] cursor-pointer">
                            <span onClick={onQuit}>Quit</span>
                        </div>}
                    </div>
                </div>
            </header >
            {children}
            < Footer />
        </>
    )
}