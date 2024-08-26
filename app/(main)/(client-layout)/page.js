import Image from "next/image";
import ku_coin from "/public/static/images/ku_coin.png";
export default function Home() {
    return (
        <main className="">
            <div className="">
                <div className="bg-home-banner bg-cover bg-no-repeat ">
                    <div className="content-area mx-auto h-[480px] flex flex-col pt-[78px]">
                        <div className="text-center font-[600] text-[#fff] text-[68px]">
                            Growth&nbsp;your&nbsp;crypto&nbsp;asset<br />Build&nbsp;for&nbsp;the&nbsp;top
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[80px]">
                <h6 className="text-center text-[52px] font-[600]">What We Serve</h6>
                {/* 1 */}
                <div className="px-[125px] mt-[60px] flex justify-between">
                    <div className="flex justify-center items-center">
                        <div className="w-[482px] h-[364px]">
                            <Image src="/static/images/financial.png" width={482} height={364} alt="financial"></Image>
                        </div>
                    </div>
                    <div className="w-[520px] pt-[16px]">
                        <h3 className="text-[#1a1a1a] text-[35px]">
                            <span>Financial</span>&nbsp;
                            <span className="font-[600]">Solution</span>
                        </h3>
                        <p className="text-[#4d4d4d] text-[20px] mt-[35px] leading-8">
                            Customizable risk management solutions in hedging risks associated with digital assets volatile factorsEmpowering platform by unified interface with multiple exchanges & order management, leverage trading and product shelves Customized algo trading solutions,including smart order router, large orders slicing & VWAPTWAP, etc.
                        </p>
                    </div>
                </div>
                {/* 2 */}
                <div className="px-[125px] mt-[81px] flex justify-between">
                    <div className="flex justify-center items-center">
                        <div className="w-[520px] pt-[16px]">
                            <h3 className="text-[#1a1a1a] text-[35px]">
                                <span>Market</span>&nbsp;
                                <span className="font-[600]">Making</span>
                            </h3>
                            <p className="text-[#4d4d4d] text-[20px] mt-[35px] leading-8">
                                We support major exchanges and cover over 100 digital currency pairs We provide liquidity by Provide 24x7liquidity on all levels in terms of depth of order book and maintenance of bid/ask spread.
                            </p>
                        </div>
                    </div>

                    <div className="">
                        <Image src="/static/images/market.png" width={473} height={373} alt="market"></Image>
                    </div>
                </div>
                {/* 3 */}
                <div className="px-[125px] mt-[81px] flex justify-between">
                    <div className="flex justify-center items-center">
                        <div className="h-[373px]">
                            <Image src="/static/images/asset.png" width={487} height={373} alt="asset"></Image>
                        </div>
                    </div>
                    <div className="w-[520px] pt-[16px]">
                        <h3 className="text-[#1a1a1a] text-[35px]">
                            <span>Asset</span>&nbsp;
                            <span className="font-[600]">Management</span>
                        </h3>
                        <p className="text-[#4d4d4d] text-[20px] mt-[35px] leading-8">
                            A1 Asset Manageris a digital asset managementplatform developed by the Alfa1 team to provide holisticdigital asset management services for institutions orhigh net worth customers, by offering:
                        </p>
                        <ul className="text-[#4d4d4d] mt-[25px] list-disc ml-4">
                            <li>
                                Secure digital asset storage; timely and transparent product information disclosure
                            </li>
                            <li>
                                Products demominated in varieties of currencies :BTC,USDT,EOS ,ETH,BCH,BSV Etc.
                            </li>
                            <li>
                                Investment portfolio by allocation of sophicated algorithtic strategies according to different level of risk appetite and expected returns
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-home-grid-point bg-cover bg-no-repeat mt-[80px] h-[1231px]">
                <div className="px-[125px]">
                    <h6 className="text-center text-[52px] font-[600] pt-[60px] pb-[46px] px-[130px]">Why Crest</h6>
                    <div className="flex justify-between">
                        <div>
                            <Image
                                src="/static/icons/tradingStrategies.svg"
                                alt="tradingStrategies"
                                width={76}
                                height={76}
                                priority
                            />
                            <div className="max-w-[520px] mt-[30px]">
                                <h3 className="text-[#1a1a1a] text-[35px] leading-[70px]">
                                    <span className="font-[500]">Profound trading strategies</span>
                                </h3>
                                <p className="text-[#4d4d4d] text-[20px] mt-[5px] leading-8">
                                    Profound trading experiences. and multi algorisitic strategies combined·with A.l. model trained on massive market data to capitalize for superior performance in all market
                                </p>
                            </div>
                        </div>
                        <div>
                            <Image
                                src="/static/icons/riskManagement.svg"
                                alt="riskManagement"
                                width={76}
                                height={76}
                                priority
                            />
                            <div className="max-w-[520px] mt-[30px]">
                                <h3 className="text-[#1a1a1a] text-[35px] leading-[70px]">
                                    <span className="font-[500]">Stringent risk management</span>
                                </h3>
                                <p className="text-[#4d4d4d] text-[20px] mt-[5px] leading-8">
                                    Risk metrics and control at all levels from product to transactions,from top to·bottom,with layers of risk control on various volatile factors
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-between mt-[50px]">
                        <div>
                            <Image
                                src="/static/icons/tradingSystem.svg"
                                alt="tradingSystem"
                                width={76}
                                height={76}
                                priority
                            />
                            <div className="max-w-[520px] mt-[30px]">
                                <h3 className="text-[#1a1a1a] text-[35px] leading-[70px]">
                                    <span className="font-[500]">Robust trading system</span>
                                </h3>
                                <p className="text-[#4d4d4d] text-[20px] mt-[5px] leading-8">
                                    World-class trading system designed for institutional user in support of high-frequency tradings is optimized for digital asset and.implemented for over thousands hours trading with no discontinuity
                                </p>
                            </div>
                        </div>
                        <div>
                            <Image
                                src="/static/icons/productDesign.svg"
                                alt="productDesign"
                                width={76}
                                height={76}
                                priority
                            />
                            <div className="max-w-[520px] mt-[30px]">
                                <h3 className="text-[#1a1a1a] text-[35px] leading-[70px]">
                                    <span className="font-[500]">Professional product design</span>
                                </h3>
                                <p className="text-[#4d4d4d] text-[20px] mt-[5px] leading-8">
                                    Wealth of product design experiences in traditional finance.including the portfolio developed by sophiscated algorithm, application of derivatives, structure of product for the customized needs in digital asset management
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="mx-[50px]">
                <div className="bg-[#1a1a1a] rounded-[40px]  mt-[-270px] h-[480px]">
                    <h6 className="text-[#fff] text-[52px]  font-[600] text-center pt-[50px]">Our Partners</h6>

                    <div className="px-[80px] mt-[55px]">

                        <div className="grid grid-cols-4 place-content-stretch gap-y-10 gap-x-16">

                            <div className="relative h-[90px] ">
                                <Image src={ku_coin} layout="fill" alt=""></Image>
                            </div>
                            <div className="relative h-[90px] ">
                                <Image src="/static/images/2.png" layout="fill" alt=""></Image>
                            </div>

                            <div className="relative h-[90px] ">
                                <Image src="/static/images/3.png" layout="fill" alt=""></Image>
                            </div>
                            <div className="relative h-[90px]">
                                <Image src="/static/images/4.png" layout="fill" alt=""></Image>
                            </div>
                            <div className="relative h-[90px] ">
                                <Image src="/static/images/5.png" layout="fill" alt=""></Image>
                            </div>
                            <div className="relative h-[90px] ">
                                <Image src="/static/images/8.png" layout="fill" alt=""></Image>
                            </div>
                            <div className="relative h-[90px] ">
                                <Image src="/static/images/6.png" layout="fill" alt=""></Image>
                            </div>

                            <div className="relative h-[90px] ">
                                <Image src="/static/images/7.png" layout="fill" alt=""></Image>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
