import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/static/icons/logo.png";
import Footer from "./footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Crest Farm",
    description: "crest farm web3",
};

export default function RootLayout({ children }) {


    return (
        <html lang="en">

            <body>
                <header className="px-[50px]">
                    <div className="content-area mx-auto flex h-24 flex-row justify-between">
                        <div className={"flex h-24 items-center"}>
                            <Link href="/#">
                                <Image src={logo} width={236} height={46} alt="" />
                            </Link>
                        </div>
                        <div className="flex h-24">
                            <div className="h-24 leading-[96px] cursor-pointer"><span><Link href="/strategy">Strategy</Link></span></div>
                            <div className="h-24 leading-[96px] cursor-pointer ml-[88px]"><span><Link href="/tradingPost">Protfolio</Link></span></div>
                            <div className="h-24 leading-[96px] cursor-pointer ml-[88px]"><span className="px-[33px] py-[15px] bg-black hover:bg-[#3d3d3d] text-white cursor-pointer rounded-[14px]">Sign In</span></div>
                        </div>
                    </div>
                </header>
                {children}
                <Footer />
            </body>
        </html>
    );
}
