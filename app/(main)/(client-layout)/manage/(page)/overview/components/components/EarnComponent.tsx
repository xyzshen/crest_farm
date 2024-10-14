import { formatDecimal, formatNumber } from "@/utils";
import { useEffect, useState } from "react";
import PieChart from "../charts/PieChart";
import { IAssets } from "../../type";

const defaultAssetsList = [
  {
    label: 'GDN',
    key: 'gmx',
    value: 0,
  }, {
    label: 'CTA',
    key: 'cta',
    value: 0,
  }, {
    label: 'LMH',
    key: 'lmh',
    value: 0,
  }, {
    label: 'PT',
    key: 'pt',
    value: 0,
  },
  {
    label: 'SEA',
    key: 'sea',
    value: 0,
  },
  {
    label: 'SCM',
    key: 'scm',
    value: 0,
  }
]

const TVLComponent = (props: { data: any }) => {
  const { data } = props;
  const [tvlValue, setTvlValue] = useState(0);
  const [assetsList, setAssetsList] = useState<IAssets[]>(defaultAssetsList)


  const formatData = (data: any) => {
    const array = defaultAssetsList.map((item: IAssets) => {
      const obj = data.find((d: any) => d.strategy === item.key)
      return {
        label: item.label,
        value: obj ? obj.value : 0
      }
    })
    return array
  }

  const totalNumber = (data: IAssets[]) => {
    return data.reduce((pre: number, cur: IAssets) => {
      return pre + cur.value
    }, 0)
  }

  useEffect(() => {
    if (data) {
      const array = formatData(data || [])
      setTvlValue(totalNumber(array || []))
      setAssetsList(array)
    }
  }, [data])


  return (
    <div style={{ width: 'calc(50% - 15px)' }} className="flex bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col justify-between">
        <div>
          <div className="text-[#4D4D4D]">总利润 <span className="text-[#999]">(USDT)</span></div>
          <div className="text-2xl text-[#1a1a1a] font-semibold">${formatDecimal(tvlValue, 2)}</div>
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
        <PieChart data={assetsList.map(item => {
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