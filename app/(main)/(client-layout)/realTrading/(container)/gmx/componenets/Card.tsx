import { TGmxData } from "@/app/service/realTrading-api/type";
import MiniLine from "./MiniLine";
import { calcDaysFromNow } from "@/utils";

interface ICard extends TGmxData {
  toDetail: () => void
}

const Card = (props: ICard) => {
  const { symbol, userName, createTime, detail = [], principal, profit, status, toDetail } = props;

  return <div className="bg-white shadow-md p-4 rounded-md cursor-pointer h-[275px]" onClick={toDetail}>
    <div className="text-[#1a1a1a] text-xl font-bold">{symbol}</div>
    <div className="flex justify-between py-4">
      <div className="text-sky-500 text-lg font-semibold">{userName}</div>
      {status === 1 && <div className="text-lg font-medium text-emerald-400">运行{calcDaysFromNow(createTime)}天</div>}
      {status === 0 && <div className="text-lg font-medium text-red-500">已停止</div>}
    </div>
    <div className="w-full py-4 h-[130px]">
      <MiniLine
        style={{ width: '100%', height: '100%' }}
        data={detail.map((item: any) => {
          return {
            time: item.time,
            value: item.apr
          }
        })} />
    </div>
    <div className="flex justify-between">
      <div className="flex">
        <div className="text-[#666] pr-2">本金</div>
        <div className="font-semibold">${principal}</div>
      </div>
      <div className="flex">
        <div className="text-[#666] pr-2">收益</div>
        <div className="font-semibold">${profit || 0}</div>
      </div>
    </div>
  </div>
}

export default Card;