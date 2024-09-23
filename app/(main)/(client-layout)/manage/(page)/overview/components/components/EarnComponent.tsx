import { formatNumber } from "@/utils";
import { useState } from "react";
import PieChart from "../charts/PieChart";

const defaultAssetsList = [
  {
    label: 'GDN',
    value: 1099,
  }, {
    label: 'CTA',
    value: 892,
  }, {
    label: 'LMH',
    value: 1982,
  }, {
    label: 'PT',
    value: 1011,
  },
  {
    label: 'SEA',
    value: 378,
  },
  {
    label: 'SCM',
    value: 1768,
  }
]

const TVLComponent = () => {
  const [tvlValue, setTvlValue] = useState(7001);
  const [assetsList, setAssetsList] = useState<any>(defaultAssetsList)
  return (
    <div style={{ width: 'calc(50% - 15px)' }} className="flex bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col justify-between">
        <div>
          <div className="text-[#4D4D4D]">User Earned <span className="text-[#999]">(USDT)</span></div>
          <div className="text-2xl text-[#1a1a1a] font-semibold">${formatNumber(tvlValue)}</div>
        </div>
        <div className="flex flex-wrap">
          {
            assetsList.map((item: any, index: number) => {
              return <div className="w-[50%] flex p-2 text-xs" key={index}>
                <div className="text-[#999]">{item.label}</div>
                <div className="pl-4 text-[#1a1a1a]">${formatNumber(item.value)}</div>
              </div>
            })
          }
        </div>
      </div>
      <div className="w-[40%] flex flex-col justify-between">
        <div></div>
        <PieChart data={defaultAssetsList.map(item => {
          return {
            name: item.label,
            value: item.value
          }
        })} />
      </div>
    </div>
  );
}

export default TVLComponent;