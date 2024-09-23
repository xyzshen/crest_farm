import dayjs from "dayjs";
import { useState } from "react";
import LineChart from "../charts/LineChart";
import { formatNumber } from "@/utils";

const TotalAssetsTrend = () => {
  const [currentValue, setCurrentValue] = useState<number>(1102);
  const [currentTime, setCurrentTime] = useState<string>(dayjs().format('YYYY-MM-DD'));
  return <div className="bg-white mt-8 p-8 rounded-lg shadow-md">
    <div className="flex justify-between">
      <div className="text-2xl text-[#333] font-semibold">
        Total assets trend
      </div>
      <div className="flex items-center">
        <div className="text-xl text-[#2C4E93] font-semibold pr-4">${formatNumber(currentValue)}</div>
        <div>{currentTime}</div>
      </div>
    </div>
    <div>
      <LineChart />
    </div>
  </div>
}

export default TotalAssetsTrend;