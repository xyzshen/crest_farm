'use client'
import { useState } from "react";
import Image from "next/image";
import Chart from "../../../components/Chart.js"
import binance from "/public/static/images/binance.png";
import curve from "/public/static/images/curve.png";
import okx from "/public/static/images/okx.png";
import pancokeSwap from "/public/static/images/pancokeSwap.png";
import './Strategy.css'
export default function Strategy() {
    const [isActiveKey, setActiveKey] = useState(1);
    const [isShowDetails, setShowDetails] = useState(false);
    const [isTitle, setTitle] = useState('');
    const options = {
        title: {
            text: 'Running for 45 days',
            right: 0,
            top: 0,
            textStyle: {
                fontSize: 14,
                color: '#2C4E93',
                fontWeight: '500'
            }

        },
        tooltip: {},
        legend: {

        },
        xAxis: {
            type: 'category',
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "JuI", "Aug", "Sep", "Oct", "NOV", "Dec"],
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}.00 %'
            },
            interval: 50,
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true,
            height: '105px',
        },
        series: [
            {
                type: "bar",
                data: [10, 50, 70, -10, 2.2, 18.5, 3.7, -51],
                barWidth: 18,
                itemStyle: {
                    color: '#5E9EFF',
                },
                tooltip: {
                    formatter: '{b}{c} %'
                }
            },
        ],
    };
    const options2 = {
        title: {

        },
        tooltip: {},
        legend: {

        },
        xAxis: {
            type: 'category',
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "JuI", "Aug", "Sep", "Oct", "NOV", "Dec"],
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}.00 %'
            },
            interval: 50,
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true,
        },
        series: [
            {
                type: "bar",
                data: [10, 50, 70, -10, 2.2, 18.5, 3.7, -51],
                barWidth: 26,
                itemStyle: {
                    color: '#5E9EFF',
                },
                tooltip: {
                    formatter: '{b}{c} %'
                }
            },
        ],
    }

    const onShowDetails = (param) => {
        console.log(param);
        setTitle(param);
        setShowDetails(true);
    }
    return (
        <div>
            {
                !isShowDetails && <div className="bg-home-grid-point bg-cover bg-no-repeat h-[1406px]">
                    <div className="px-[130px] pt-[60px] pb-[70px]">
                        <h3 className="text-[40px] text-[#333] font-bold leading-[48px]">Crest Strategy</h3>
                        {/* <p className="text-[14px] text-[#4d4d4d] font-normal leading-4 mt-[15px]">Deposit and take over your position to GP</p> */}
                    </div>
                    <div className="px-[130px]">
                        <div className="w-[555px] h-[44px] bg-[#ededed] rounded-[24px] flex justify-between px-1 py-1  text-[16px] shadow-strategy_chart_table_shadow">
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 1 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => setActiveKey(1)}>
                                <span>LRT</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 2 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => setActiveKey(2)}>
                                <span>LST</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 3 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => setActiveKey(3)}>
                                <span>Liquidity Pool</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 4 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => setActiveKey(4)}>
                                <span>Points</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 5 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => setActiveKey(5)}>
                                <span>Stables</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-[30px] mt-[30px]">
                            <div className="h-[334px] bg-[#fcfcfc] rounded-[20px] px-[45px] py-[35px] flex-col justify-between flex hover:shadow-strategy_chart_shadow">
                                <h2 className="flex justify-between items-center">
                                    <span className="text-[24px] text-[#2C4E93] cursor-pointer" onClick={() => onShowDetails('Stable Coin Mining')}>Stable Coin Mining</span>
                                </h2>
                                <div className="h-[140px]">
                                    <Chart options={options} />
                                </div>
                                <div className="h-[55px] flex-col  justify-between text-[16px]">
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Return</span>
                                            <span className="text-[#333333]">28.59%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Sharpe Ratio</span>
                                            <span className="text-[#333333]">9.16</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Volatility</span>
                                            <span className="text-[#333333]">3.43%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Max Drawdown</span>
                                            <span className="text-[#333333]">0.7%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[334px] bg-[#fcfcfc] rounded-[20px] px-[45px] py-[35px] flex-col justify-between flex hover:shadow-strategy_chart_shadow">
                                <h2 className="flex justify-between items-center">
                                    <span className="text-[24px] text-[#2C4E93] cursor-pointer" onClick={() => onShowDetails('Liquidity Mining Hedging')}>Liquidity Mining Hedging</span>
                                </h2>
                                <div className="h-[140px]">
                                    <Chart options={options} />
                                </div>
                                <div className="h-[55px] flex-col  justify-between text-[16px]">
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Return</span>
                                            <span className="text-[#333333]">28.59%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Sharpe Ratio</span>
                                            <span className="text-[#333333]">9.16</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Volatility</span>
                                            <span className="text-[#333333]">3.43%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Max Drawdown</span>
                                            <span className="text-[#333333]">0.7%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[334px] bg-[#fcfcfc] rounded-[20px] px-[45px] py-[35px] flex-col justify-between flex hover:shadow-strategy_chart_shadow">
                                <h2 className="flex justify-between items-center">
                                    <span className="text-[24px] text-[#2C4E93] cursor-pointer" onClick={() => onShowDetails('GMX-GM Delta Neutral')}>GMX-GM Delta Neutral</span>
                                </h2>
                                <div className="h-[140px]">
                                    <Chart options={options} />
                                </div>
                                <div className="h-[55px] flex-col  justify-between text-[16px]">
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Return</span>
                                            <span className="text-[#333333]">28.59%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Sharpe Ratio</span>
                                            <span className="text-[#333333]">9.16</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Volatility</span>
                                            <span className="text-[#333333]">3.43%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Max Drawdown</span>
                                            <span className="text-[#333333]">0.7%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[334px] bg-[#fcfcfc] rounded-[20px] px-[45px] py-[35px] flex-col justify-between flex hover:shadow-strategy_chart_shadow">
                                <h2 className="flex justify-between items-center">
                                    <span className="text-[24px] text-[#2C4E93] cursor-pointer" onClick={() => onShowDetails('Pair Trading')}>Pair Trading</span>
                                </h2>
                                <div className="h-[140px]">
                                    <Chart options={options} />
                                </div>
                                <div className="h-[55px] flex-col  justify-between text-[16px]">
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Return</span>
                                            <span className="text-[#333333]">28.59%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Sharpe Ratio</span>
                                            <span className="text-[#333333]">9.16</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Volatility</span>
                                            <span className="text-[#333333]">3.43%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Max Drawdown</span>
                                            <span className="text-[#333333]">0.7%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[334px] bg-[#fcfcfc] rounded-[20px] px-[45px] py-[35px] flex-col justify-between flex hover:shadow-strategy_chart_shadow">
                                <h2 className="flex justify-between items-center">
                                    <span className="text-[24px] text-[#2C4E93] cursor-pointer" onClick={() => onShowDetails('CTA')}>CTA</span>
                                </h2>
                                <div className="h-[140px]">
                                    <Chart options={options} />
                                </div>
                                <div className="h-[55px] flex-col  justify-between text-[16px]">
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Return</span>
                                            <span className="text-[#333333]">28.59%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Sharpe Ratio</span>
                                            <span className="text-[#333333]">9.16</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Annual Volatility</span>
                                            <span className="text-[#333333]">3.43%</span>
                                        </div>
                                        <div className="w-[210px] flex justify-between">
                                            <span className="text-[#999999]">Max Drawdown</span>
                                            <span className="text-[#333333]">0.7%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
            {
                isShowDetails &&
                <div className="h-full bg-[#f2f2f2]">
                    <div className="bg-strategy-banner h-[260px]">
                        <div className="px-[130px]">
                            <div className="flex pt-[30px] cursor-pointer" onClick={() => setShowDetails(false)}>
                                <Image src="/static/icons/back.svg"
                                    alt="minus"
                                    width={14}
                                    height={14}
                                    priority></Image>
                                <span className="text-[16px] text-[#FFFFFF] ml-2">Back</span>
                            </div>
                            <div className="text-[#ffffff] mt-[40px]">
                                <h6 className="text-[40px] font-bold">{isTitle}</h6>
                                <p className="text-[14px] mt-[14px]">Obtain stable income through stablecóin staking and liquidity
                                    proVision
                                    new currency minin
                                    iguidity
                                    provision in lending agreements, etc.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[-45px] px-[130px]">
                        <div className=" h-[160px]  bg-[#fcfcfc] rounded-[20px] shadow-strategy_days_shadow pl-[31px] pt-[10px]">

                            <table className="w-full text-left ">
                                <tr className="leading-10">
                                    <th className="text-[#999999] text-[16px] font-[600]">year</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Jan</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Feb</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Mar</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Apr</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">May</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Jun</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Jul</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Aug</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Sep</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Oct</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Nov</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Dec</th>
                                    <th className="text-[#999999] text-[16px] font-[600]">Annual</th>
                                </tr>
                                <tr className="leading-10">
                                    <td className="text-[#999999] text-[16px]">2023</td>
                                    <td className="text-[#999999] text-[16px]">N/A</td>
                                    <td className="text-[#999999] text-[16px]">N/A</td>
                                    <td className="text-[#999999] text-[16px]">N/A</td>
                                    <td className="text-[#999999] text-[16px]">N/A</td>
                                    <tdv className="text-[#999999] text-[16px]">N/A</tdv>
                                    <td className="text-[#999999] text-[16px]">N/A</td>
                                    <td className="text-[#999999] text-[16px]">N/A</td>
                                    <td>1.65%</td>
                                    <td>1.54%</td>
                                    <td>1.35%</td>
                                    <td>1.38%</td>
                                    <td>1.38%</td>
                                    <td>23%</td>
                                </tr>
                                <tr className="leading-10">
                                    <td className="text-[#999999] text-[16px] font-[600]">2024</td>
                                    <td>1.65%</td>
                                    <td>1.54%</td>
                                    <td>1.35%</td>
                                    <td>1.38%</td>
                                    <td>1.38%</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="mt-[30px] px-[130px]">
                        <div className=" h-[380px] bg-[#fcfcfc] rounded-[20px] shadow-strategy_days_shadow pt-[40px] pl-[30px] pr-[32px] pb-[44px]">
                            <div className=" flex justify-between items-center">
                                <div className="text-[#333333] text-[24px] font-[600]">
                                    Performance
                                </div>
                                <div>
                                    <span className="text-[#2C4E93] text-[20px] font-bold">Monthly Yield Overview</span>
                                    <span className="text-[#4d4d4d] text-[14px] ml-[15px]">since 2024/06/24</span>
                                </div>
                            </div>
                            <div className="h-[252px]">
                                <Chart options={options2}></Chart>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[30px] px-[130px] pb-[60px] grid grid-cols-7 gap-[30px]">
                        <div className="h-[315px] bg-[#fcfcfc] rounded-[20px] shadow-strategy_days_shadow pl-[30px] pr-[44px] pt-[40px] col-span-3">
                            <h1 className="text-[24px] text-[#333333] font-[600]">Historical Data and Performance</h1>
                            <div className="text-[16px]">
                                <p className="flex justify-between leading-10">
                                    <span className="text-[#999999]">Initial Date</span>
                                    <span className="text-[#333333]">2023-8</span>
                                </p>
                                <p className="flex justify-between leading-10">
                                    <span className="text-[#999999]">Annual Return</span>
                                    <span className="text-[#333333]">28.59%</span>
                                </p>
                                <p className="flex justify-between leading-10">
                                    <span className="text-[#999999]">Annual Volatility</span>
                                    <span className="text-[#333333]">3.43%</span>
                                </p>
                                <p className="flex justify-between leading-10">
                                    <span className="text-[#999999]">Sharpe Ratio</span>
                                    <span className="text-[#333333]">9.16</span>
                                </p>
                                <p className="flex justify-between leading-10">
                                    <span className="text-[#999999]">Max Drawdown</span>
                                    <span className="text-[#333333]">0.7%</span>
                                </p>
                            </div>
                        </div>
                        <div className="h-[315px] bg-[#fcfcfc] rounded-[20px] shadow-strategy_days_shadow pl-[30px] pr-[44px] pt-[40px] col-span-4">
                            <h1 className="text-[24px] text-[#333333] font-[600]">Cooperating Party</h1>
                            <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px] mt-[15px]">
                                <div className="w-full relative  h-[90px]">
                                    <Image src={binance} layout="fill" alt='binance'></Image>
                                </div>
                                <div className="w-full relative h-[90px]">
                                    <Image src={pancokeSwap} layout="fill" alt='pancokeSwap'></Image>
                                </div>
                                <div className="w-full relative h-[90px]">
                                    <Image src={curve} layout="fill" alt='curve'></Image>
                                </div>
                                <div className="w-full relative h-[90px]">
                                    <Image src={okx} layout="fill" alt='okx'></Image>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )

}