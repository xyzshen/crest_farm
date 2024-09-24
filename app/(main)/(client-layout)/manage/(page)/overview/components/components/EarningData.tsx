import { formatDecimal, formatNumber } from "@/utils";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import BarChart from "../charts/BarChart";

const EarningData = (props: { data: any }) => {
  const { data } = props
  const [currentValue, setCurrentValue] = useState<number>(1102);
  const [currentTime, setCurrentTime] = useState<string>(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    if (data && data.length > 0) {
      const lastData = data[data.length - 1]
      const now = dayjs().format('YYYY-MM-DD')
      setCurrentValue(lastData?.value || 0)
      setCurrentTime(lastData?.date || now)
    }
  }, [data])

  const stableList = useMemo(() => {
    return data || []
  }, [data])

  return <div className="bg-white mt-8 p-8 rounded-lg shadow-md">
    <div className="flex justify-between">
      <div className="text-2xl text-[#333] font-semibold">
        Total assets trend
      </div>
      <div className="flex items-center">
        <div className="text-xl text-[#2C4E93] font-semibold pr-4">${formatDecimal(currentValue, 2)}</div>
        <div>{currentTime}</div>
      </div>
    </div>
    <div>
      <BarChart data={stableList} />
    </div>
  </div>
}

export default EarningData