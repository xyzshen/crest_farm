import Image from "next/image";
export default function TradingPostLayout({ children }) {
    return (
        <div className="bg-[#f2f2f2] flex  pb-[33px]">
            <ul className=" w-[200px] h-screen bg-white pl-[30px] pt-[22px] text-[14px]">
                <li className={`flex text-[#999999]`}>
                    <Image
                        src="/static/icons/stage.svg"
                        alt="tradingStrategies"
                        width={18}
                        height={16}
                        priority
                    />
                    <span className="ml-[13px]">Dashboard</span>
                </li>
                <li className={`flex text-[#999999] pt-[44px]`}>
                    <Image
                        src="/static/icons/strategy.svg"
                        alt="tradingStrategies"
                        width={18}
                        height={17}
                        priority
                    />
                    <span className="ml-[13px]">Strategy</span>
                </li>
                <li className={`flex text-[#1a1a1a] pt-[44px]`}>
                    <Image
                        src="/static/icons/tradingPost.svg"
                        alt="tradingStrategies"
                        width={17}
                        height={17}
                        priority
                    />
                    <span className="ml-[13px]">Trading post</span>
                </li>
            </ul>
            {children}
        </div>
    );
}
