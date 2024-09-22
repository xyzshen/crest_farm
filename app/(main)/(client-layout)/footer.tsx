
'use client'
import Discord from "/public/static/icons/discord.svg";
import Discord1 from "/public/static/icons/discord1.svg";
import Telegram from "/public/static/icons/telegram.svg";
import Telegram1 from "/public/static/icons/telegram1.svg";
import Twitter from "/public/static/icons/twitter.svg";
import Twitter1 from "/public/static/icons/twitter1.svg";
import Github from "/public/static/icons/github.svg";
import Github1 from "/public/static/icons/github1.svg";
import { useState } from "react";
import Logo from "/public/static/icons/logo.svg";
export default function Footer() {
    const [isShowDiscord, setIsShowDiscord] = useState(true);
    const [isShowTelemetry, setIsShowTelemetry] = useState(true);
    const [isShowTwitter, setIsShowTwitter] = useState(true);
    const [isShowGithub, setIsShowGithub] = useState(true);
    return (
        <footer className="">
            <div className="px-[50px] flex  items-center justify-between text-center text-[#4d4d4d] h-[136px] w-content">
                <div>
                    <Logo />
                </div>
                <div className="text-[16px] text-[#4d4d4d] font-[400]">©&nbsp;2024&nbsp;Crest&nbsp;Labs&nbsp;Ltd.&nbsp;All&nbsp;rights&nbsp;reserved&nbsp;</div>
                <div className="flex flex-row">
                    <div className=""
                        onMouseEnter={() => setIsShowDiscord(false)}
                        onMouseLeave={() => setIsShowDiscord(true)}
                    >
                        {isShowDiscord ? <Discord /> : <Discord1 />}
                    </div>
                    <div className="pl-[25px]"
                        onMouseEnter={() => setIsShowTelemetry(false)}
                        onMouseLeave={() => setIsShowTelemetry(true)}
                    >
                        {isShowTelemetry ? <Telegram /> : <Telegram1 />}
                    </div>
                    <div className="pl-[25px]"
                        onMouseEnter={() => setIsShowTwitter(false)}
                        onMouseLeave={() => setIsShowTwitter(true)}
                    >
                        {isShowTwitter ? <Twitter /> : <Twitter1 />}
                    </div>
                    <div className="pl-[25px]"
                        onMouseEnter={() => setIsShowGithub(false)}
                        onMouseLeave={() => setIsShowGithub(true)}
                    >
                        {isShowGithub ? <Github /> : <Github1 />}
                    </div>
                </div>
            </div>
        </footer>
    )
}