import DetailItem from "./DetailItem"
import { formatDecimal } from "@/utils"

interface IShort {
  data: any
}

const Short = (props: IShort) => {
  const { data } = props
  return <div className=" bg-white rounded-md p-6 mb-6">
    <div className="text-[1rem] text-[#1a1a1a] font-bold pb-4">空单信息</div>
    <div className="w-full flex flex-wrap items-center justify-between  border-1 rounded-md">
      {/* <div className="flex w-[25%] pb-4">
        <div className="pr-2 text-[#666]">交易对</div>
        <div className="text-[#1a1a1a] font-semibold">{data?.symbol}</div>
      </div> */}
      <DetailItem label="交易对" value={data?.symbol} />
      <DetailItem label="持仓成本价" value={formatDecimal(data?.entryPrice || 0, 4)} />
      <DetailItem label="初始保证金" value={formatDecimal(data?.initialMargin || 0, 4)} />
      <DetailItem label="保证金" value={formatDecimal(data?.maintMargin || 0, 4)} />
      <DetailItem label="是否逐仓" value={data?.isolated ? '是' : '否'} />
      <DetailItem label="杠杆倍率" value={data?.leverage} />
      <DetailItem label="价值" value={formatDecimal(data?.notional || 0, 4)} />
      <DetailItem label="持仓数量" value={formatDecimal(data?.positionAmt || 0, 4)} />
      <DetailItem label="持仓方向" value={data?.positionSide} />
      <DetailItem label="持仓未实现盈亏" value={formatDecimal(data?.unrealizedProfit || 0, 4)} />
      <div className="w-[25%]"></div>
      <div className="w-[25%]"></div>
      <div className="w-[25%]"></div>
    </div>
  </div>
}

export default Short