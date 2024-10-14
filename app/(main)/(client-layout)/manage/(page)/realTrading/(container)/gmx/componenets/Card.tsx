import { TGmxData } from "@/app/service/realTrading-api/type";
import MiniLine from "./MiniLine";
import { calcDaysFromNow, formatDecimal } from "@/utils";
import { useMemo } from "react";

interface ICard extends TGmxData {
  toDetail: () => void
}

const Card = (props: ICard) => {
  const { symbol, userName, createTime, detail = [], principal, profit, status, lastRunTime, toDetail } = props;

  return <div className="min-w-[320px] bg-white shadow-md p-4 rounded-md cursor-pointer h-[275px]" onClick={toDetail}>
    <div className="text-[#1a1a1a] text-xl font-bold">{symbol}</div>
    <div className="flex justify-between py-4">
      {status === 1 && <div className="text-lg font-medium text-emerald-400">运行 {lastRunTime ? calcDaysFromNow(lastRunTime || 0) : 0}</div>}
      {status === 0 && <div className="text-lg font-medium text-red-500">停止</div>}
    </div>
    <div className="w-full py-4 h-[130px]">
      <MiniLine
        style={{ width: '100%', height: '100%' }}
        data={detail.map((item: any) => {
          return {
            time: item.createTime,
            value: item.currentProfit
          }
        })} />
    </div>
    <div className="flex justify-between">
      <div className="flex">
        <div className="text-[#666] pr-2">本金</div>
        <div className="font-semibold">${formatDecimal(principal, 2)}</div>
      </div>
      <div className="flex">
        <div className="text-[#666] pr-2">收益</div>
        <div className="font-semibold">${formatDecimal(profit || 0, 4)}</div>
      </div>
    </div>
  </div>
}

export default Card;