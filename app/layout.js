import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/static/icons/logo.png";
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
                            <div className="h-24 leading-[96px] cursor-pointer ml-[88px]"><span className="px-[33px] py-[15px] bg-black text-white cursor-pointer rounded-[14px]">Sign In</span></div>
                        </div>
                    </div>
                </header>
                {children}
                <footer className="">
                    <div className="px-[50px] flex  items-center justify-between text-center text-[#4d4d4d] h-[136px]">
                        <div>
                            <Image src={logo} width={198} height={40} alt="" />
                        </div>
                        <div className="text-[16px] text-[#4d4d4d] font-[400]">©&nbsp;2024&nbsp;Crest&nbsp;Labs&nbsp;Ltd.&nbsp;All&nbsp;rights&nbsp;reserved&nbsp;Discord&nbsp;twitter&nbsp;github&nbsp;Medium </div>
                        <div className="flex flex-row">
                            <div>
                                <Image src="/static/icons/discord.png" width={32} height={32} alt="" />
                            </div>
                            <div className="pl-[25px]">
                                <Image src="/static/icons/github.png" width={32} height={32} alt="" />
                            </div>
                            <div className="pl-[25px]">
                                <Image src="/static/icons/telegram.png" width={32} height={32} alt="" />
                            </div>
                            <div className="pl-[25px]">
                                <Image src="/static/icons/telegram1.png" width={32} height={32} alt="" />
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
