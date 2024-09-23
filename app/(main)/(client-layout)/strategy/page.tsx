'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Chart from "../../../components/Chart"
import binance from "/public/static/images/binance.png";
import curve from "/public/static/images/curve.png";
import okx from "/public/static/images/okx.png";
import pancake_swap from "/public/static/images/pancake_swap.png";
import moment from 'moment';
import './Strategy.css'
const headers: any = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Credentials": "false",
    "Access-Control-Max-Age": "3600",
    "withCredentials": true
}
const baseUrl = 'https://link3.io';
// const baseUrl = 'https://crest.devilwind.cn';
const processData = (data: any) => {

    data.forEach((item: any) => {
        const [year, month] = item.month.split('-');
        if (year === '2023') {

            item.annual = 55.9;
        } else {
            item.annual = null;
        }

    })
    const result: any[] = [];
    const groupedByYear = data.reduce((acc: any, item: any) => {
        const [year, month] = item.month.split('-');
        const annual = item.annual;
        const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        if (!acc[year]) {
            acc[year] = { year, ...monthNames.reduce((mAcc, m) => ({ ...mAcc, [m]: '' }), {}) };
        }
        const monthName = monthNames[parseInt(month, 10) - 1];
        acc[year][monthName] = item.content.month_return.toFixed(2);
        acc[year].annual = annual;
        return acc;
    }, {});
    Object.keys(groupedByYear).forEach(year => {
        const yearData = groupedByYear[year];
        // const monthlyReturns = Object.values(yearData).slice(1, 13).filter(val => val !== 'N/A').map(Number);
        // if (monthlyReturns.length > 0) {
        //     yearData.Annual = (monthlyReturns.reduce((sum, val) => sum + val, 0)).toFixed(2);
        // } else {
        //     yearData.Annual = 'N/A';
        // }
        result.push(yearData);
    });
    return result;
};


function transformData(data: any) {
    const result: any = [];
    const groupedByYear = data.reduce((acc: any, item: any) => {
        const [year, month] = item.month.split('-');
        if (!acc[year]) {
            acc[year] = { year: year, jan: 'N/A', feb: 'N/A', mar: 'N/A', apr: 'N/A', may: 'N/A', jun: 'N/A', jul: 'N/A', aug: 'N/A', sep: 'N/A', oct: 'N/A', nov: 'N/A', dec: 'N/A' };
        }
        const monthIndex = parseInt(month, 10) - 1;
        const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        acc[year][monthNames[monthIndex]] = item.content.month_return.toFixed(2);
        return acc;
    }, {});
    for (const year in groupedByYear) {
        const months = groupedByYear[year];
        // 忽略typescript检查
        // @ts-ignore
        const annualReturn = Object.values(months).slice(1, 13).reduce((sum, value) => sum + parseFloat(value), 0).toFixed(2);
        months.Annual = `${annualReturn}`;
        result.push(months);
    }

    return result;
}
export default function Strategy() {
    const [isActiveKey, setActiveKey] = useState<number>(0);
    const [isShowDetails, setShowDetails] = useState<boolean>(false);
    const [isTitle, setTitle] = useState<string>('');
    const [chartData, setChartData] = useState<any[]>([]);
    const [filterChartData, setFilterChartData] = useState<any[]>([]);
    const [chartData2, setChartData2] = useState<any>(null);
    const [detailData, setDetailData] = useState<any[]>([]);
    const [initDate, setInitDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [strategyDetail, setStrategyDetail] = useState<any>(null);
    let options = {
        title: {
            text: '',
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
            data: [],
            axisLine: {
                lineStyle: {
                    color: "#D6D6D6"
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4d4d4d'
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}.00 %',
                lineStyle: {
                    color: "#4D4D4D"
                }
            },
            splitNumber: 1.5,
            axisLine: {
                show: false,
                color: '#4d4d4d'
            },
        },
        grid: {
            left: '0%',
            right: '11',
            bottom: '0%',
            containLabel: true,
            height: '105px',
        },
        series: [
            {
                type: "bar",
                data: [],
                barWidth: 18,
                itemStyle: {
                    color: function (params: any) {
                        return params.data < 0 ? '#ff6363' : '#5E9EFF'
                    }
                },
                tooltip: {
                    formatter: '{b} {c}%'
                }
            },
        ],
    };
    useEffect(() => {

        fetch(`${baseUrl}/crestmgn/strategy/list`, {
            method: 'GET',
            headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                let list = data.data;
                for (let i = 0; i < list.length; i++) {
                    list[i].options = options;
                }
                let list1 = JSON.parse(JSON.stringify(list));
                for (let j = 0; j < list1.length; j++) {

                    const months = list1[j].history.map((item: any) => {
                        return item.month
                    })
                    const values = list1[j].history.map((item: any) => {
                        return item.content.month_return
                    })
                    list1[j].options.xAxis.data = months;
                    list1[j].options.series[0].data = values;
                    list1[j].options.series[0].itemStyle.color = function (params: any) {
                        return params.data < 0 ? '#ff6363' : '#5E9EFF'
                    }
                }
                setChartData(list1)
                setFilterChartData(list1)
            })
    }, [])

    const tableHeaders = [{
        key: 'year',
        title: 'Year',
        dataIndex: 'year',

    },
    {
        key: 'jan',
        title: 'Jan',
        dataIndex: 'jan',
    },
    {
        key: 'feb',
        title: 'Feb',
        dataIndex: 'feb'
    },
    {
        key: 'mar',
        title: 'Mar',
        dataIndex: 'mar',
    },
    {
        key: 'apr',
        title: 'Apr',
        dataIndex: 'apr',
    },
    {
        key: 'may',
        title: 'May',
        dataIndex: 'may',
    },
    {
        key: 'jun',
        title: 'Jun',
        dataIndex: 'jun',
    },
    {
        key: 'jul',
        title: 'Jul',
        dataIndex: 'jul',
    },
    {
        key: 'aug',
        title: 'Aug',
        dataIndex: 'aug',
    },
    {
        key: 'sep',
        title: 'Sep',
        dataIndex: 'sep',
    },
    {
        key: 'oct',
        title: 'Oct',
        dataIndex: 'oct',

    },
    {
        key: 'nov',
        title: 'Nov',
        dataIndex: 'nov',
    },
    {
        key: 'dec',
        title: 'Dec',
        dataIndex: 'dec',
    },
    {
        key: 'annual',
        title: 'Annual',
        dataIndex: 'Annual',
    }
    ]
    const onShowDetails = async (item: any) => {
        const newItem = JSON.parse(JSON.stringify(item))
        setTitle(newItem.strategy);
        newItem.options.series[0].barWidth = 26;
        newItem.options.grid.height = '205px';
        newItem.options.title = '';
        newItem.options.series[0].itemStyle.color = function (params: any) {
            return params.data < 0 ? '#ff6363' : '#5E9EFF'
        }
        setChartData2(newItem.options)
        setShowDetails(true);
        await fetch(`${baseUrl}/crestmgn/strategy/get?strategy=${item.strategy}`, {
            method: 'GET',
            headers: headers,
        }).then((res) => res.json())
            .then((data) => {
                const initialDate = data.data.detail.initialDate;
                const description = data.data.detail.description;
                const { max_drawdown, annual_return, sharpe_ratio, annual_volatillty } = data.data.detail.content;
                const content = Object.assign({}, { 'Initial Date': initialDate }, { 'Max Drawdown': `${max_drawdown}%` }, { 'Annual Return': `${annual_return}%` }, { 'Sharpe ratio': `${sharpe_ratio}%` }, { 'Annual Volatillty': `${annual_volatillty}%` });
                setStrategyDetail(content)
                setDescription(description);
                setInitDate(moment(initialDate).format('YYYY/MM'));
                const historyValues = data.data.history
                setDetailData(processData(historyValues))

            })
    }
    const formatTarget = (value: any) => {
        let str = '';
        switch (value) {
            case 'max_drawdown':
                str = 'Max Drawdown'
                break;

            case 'annual_return':
                str = 'Annual Return'
                break;
            case 'sharpe_ratio':
                str = 'Sharpe ratio'
                break;
            case 'annual_volatillty':
                str = 'Annual Volatillty'
                break;
        }
        return str;
    }
    const onTabChange = (key: any) => {
        setActiveKey(key);
        let filteredData = []
        const newData = filterChartData;
        switch (key) {
            case 1:
                filteredData = newData.filter((item) => item.strategy === 'CTA')
                break;

            case 2:
                filteredData = newData.filter((item) => item.strategy === 'GMX-GM Delta Neutral')
                break;
            case 3:
                filteredData = newData.filter((item) => item.strategy === 'Stable Coin Mining')
                break;
            case 4:
                filteredData = newData.filter((item) => item.strategy === 'Liquidity Mining Hedging')
                break;
            case 5:
                filteredData = newData.filter((item) => item.strategy === 'Pair Trading')
                break;
            case 6:
                filteredData = newData.filter((item) => item.strategy === 'Single Exchange Arbitrage')
                break;
            default:
                filteredData = newData;
                break;
        }
        setChartData(filteredData);
    }

    return (
        <div>
            {
                !isShowDetails && <div className="bg-[#eee] bg-cover bg-no-repeat h-[1406px]">
                    <div className="px-[130px] pt-[60px] pb-[70px]">
                        <h3 className="text-[40px] text-[#333] font-bold leading-[48px]">Crest Strategy</h3>
                    </div>
                    <div className="px-[130px]">
                        <div className="w-[630px] h-[44px] bg-[#ededed] rounded-[24px] flex justify-between px-1 py-1  text-[16px] shadow-strategy_chart_table_shadow">
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 0 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => onTabChange(0)}>
                                <span>ALL</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 1 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => onTabChange(1)}>
                                <span>CTA</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 2 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => onTabChange(2)}>
                                <span>GDN</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 3 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => onTabChange(3)}>
                                <span>SCM</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 4 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => onTabChange(4)}>
                                <span>LMH</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 5 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => onTabChange(5)}>
                                <span>PT</span>
                            </div>
                            <div className={`flex rounded-[24px] justify-center items-center px-[28px] py-[8px] hover:bg-[#e3e3e3] ${isActiveKey === 6 ? 'bg-[#fcfcfc] font-bold text-[#1a1a1a] shadow-tabs_sub_shadow' : 'text-[#8c8c8c]'}`}
                                onClick={() => onTabChange(6)}>
                                <span>SEA</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-[30px] mt-[30px]">
                            {chartData.map((item, index) => (
                                <div key={index} className="h-[334px] bg-[#fcfcfc] rounded-[20px] px-[45px] py-[35px] flex-col justify-between flex hover:shadow-strategy_chart_shadow">
                                    <h2 className="flex justify-between items-center">
                                        <span className="text-[24px] text-[#2C4E93] cursor-pointer" onClick={() => onShowDetails(item)}>{item.strategy}</span>
                                    </h2>
                                    <div className="h-[140px]">
                                        <Chart options={item.options} />
                                    </div>
                                    <div className="h-[55px] flex-col  justify-between text-[16px]">
                                        <div className="flex justify-between w-full">
                                            {
                                                Object.keys(item.detail.content).slice(0, 2).map((key, it) => (
                                                    <div key={it} className="w-[210px] flex justify-between leading-8">
                                                        <span className="text-[#4D4D4D] font-semibold">{formatTarget(key)}</span>
                                                        <span className="text-[#333333] font-semibold">{item.detail.content[key]}%</span>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                        <div className="flex justify-between w-full">
                                            {
                                                Object.keys(item.detail.content).slice(2, 4).map((key, it) => (
                                                    <div key={it} className="w-[210px] flex justify-between leading-8">
                                                        <span className="text-[#4D4D4D] font-semibold">{formatTarget(key)}</span>
                                                        <span className="text-[#333333] font-semibold">{item.detail.content[key]}%</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            }
            {
                isShowDetails &&
                <div className="h-full  bg-[#f2f2f2]">
                    <div className="bg-[#1a1a1a] h-[260px]">
                        <div className=" w-content">
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
                                <p className="text-[14px] mt-[14px]">{description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[-45px]   w-content">
                        <div className="bg-[#fcfcfc] rounded-[20px] shadow-strategy_days_shadow pl-8 pt-6 pb-6">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="leading-10">
                                        {tableHeaders.map((item, index) => (
                                            <th key={index} className="text-[#4D4D4D] text-base font-semibold">{item.title}</th>
                                        ))
                                        }
                                    </tr>
                                </thead>

                                <tbody>
                                    {detailData.map((item, index) => (
                                        <tr key={index} className="leading-10">
                                            {tableHeaders.map((it, i) => (
                                                !item[it.key] ? <td key={i} className="text-[#000000] text-base">{item[it.key]}</td> : it.key === "year" ? <td key={i}>{item[it.key]}</td> : <td key={i}>{item[it.key]}%</td>
                                                // item[it.key] === "N/A" ? <td key={i} className="text-[#999999] text-[16px]">{item[it.key]}</td> : it.key === "year" ? <td key={i}>{item[it.key]}</td> : <td key={i}>{item[it.key]}%</td>
                                            ))
                                            }
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-[30px]  w-content">
                        <div className=" h-[380px] bg-[#fcfcfc] rounded-[20px] shadow-strategy_days_shadow pt-[40px] pl-[30px] pr-[32px] pb-[44px]">
                            <div className=" flex justify-between items-center">
                                <div className="text-[#333333] text-[24px] font-[600]">
                                    Performance
                                </div>
                                <div>
                                    <span className="text-[#2C4E93] text-[20px] font-bold">Monthly Yield Overview</span>
                                    <span className="text-[#4d4d4d] text-[14px] ml-[15px]">since {initDate}</span>
                                </div>
                            </div>
                            <div className="h-[252px]">
                                {detailData.length && chartData2 && <Chart options={chartData2}></Chart>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-[30px]  w-content pb-[60px] grid grid-cols-7 gap-[30px]">
                        <div className="h-[315px] bg-[#fcfcfc] rounded-[20px] shadow-strategy_days_shadow pl-[30px] pr-[44px] pt-[40px] col-span-3">
                            <h1 className="text-[24px] text-[#333333] font-[600]">Historical Data and Performance</h1>
                            <div className="text-[16px]">
                                {strategyDetail && Object.keys(strategyDetail).map((key) => (<p key={key} className="flex justify-between leading-10">
                                    <span className="text-[#4D4D4D] font-semibold">{key}</span>
                                    <span className="text-[#333333] font-semibold">{strategyDetail[key]}</span>
                                </p>))}
                            </div>
                        </div>
                        <div className="h-[315px] bg-[#fcfcfc] rounded-[20px] shadow-strategy_days_shadow pl-[30px] pr-[44px] pt-[40px] col-span-4">
                            <h1 className="text-[24px] text-[#333333] font-[600]">Cooperating Party</h1>
                            <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px] mt-[15px]">
                                <div className="w-full relative  h-[90px]">
                                    <Image src={binance} layout="fill" alt='binance'></Image>
                                </div>
                                <div className="w-full relative h-[90px]">
                                    <Image src={pancake_swap} layout="fill" alt='pancake_swap'></Image>
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