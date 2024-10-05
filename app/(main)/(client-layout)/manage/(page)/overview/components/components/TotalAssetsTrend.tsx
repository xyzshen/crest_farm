import dayjs from "dayjs";
import { useEffect, useState } from "react";
import LineChart from "../charts/LineChart";
import { formatDecimal, formatNumber, formatTimeToTz } from "@/utils";

const TotalAssetsTrend = (props: { data: any }) => {
  const { data } = props
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    if (data) {
      const lastData = data[data.length - 1]
      const now = dayjs().format('YYYY-MM-DD')
      setCurrentValue(lastData?.value || 0)
      setCurrentTime(lastData?.date || now)
    }
  }, [data])

  return <div className="bg-white mt-8 p-8 rounded-lg shadow-md">
    <div className="flex justify-between">
      <div className="text-2xl text-[#333] font-semibold">
        Total assets trend
      </div>
      <div className="flex items-center">
        <div className="text-xl text-[#2C4E93] font-semibold pr-4">${formatDecimal(currentValue, 2)}</div>
        <div>{formatTimeToTz(currentTime, 'YYYY-MM-DD')}</div>
      </div>
    </div>
    <div>
      <LineChart data={data} />
    </div>
  </div>
}

export default TotalAssetsTrend;