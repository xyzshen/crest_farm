'use client'
import Container from "@/app/components/Container"
import Card from "./componenets/Card"
import { PlusOutlined } from "@ant-design/icons"
import { AddLiveTrading } from "./modal/AddLiveTrading"
import { useCallback, useEffect, useState } from "react"
import { RealTradingApi } from "@/app/service/realTrading-api"
import { TGmxData } from "@/app/service/realTrading-api/type"
import { formatDecimal, formatNumber } from "@/utils"
import { useRouter } from "next/navigation"

const CMXPageList = () => {
  const router = useRouter()
  const [list, setList] = useState<TGmxData[]>([])
  const [AddLiveTradingVisible, setAddLiveTradingVisible] = useState<boolean>(false)
  const [statics, setStatics] = useState<any>()

  const toDetail = (item: any) => {
    sessionStorage.setItem('gmxData', JSON.stringify(item))
    router.push(`/realTrading/gmx/${item.id}`)
  }

  const fetchList = useCallback(() => {
    const query = {
      pageNumber: 1,
      pageSize: 100
    }
    RealTradingApi.getGMXList(query).then((res: any) => {
      if (res) {
        setList(res.data)
      }
    })
  }, [])

  const getGmxStat = useCallback(() => {
    RealTradingApi.getGmxStat().then((res: any) => {
      if (res) {
        setStatics(res.data)
      }
    })
  }, [])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  useEffect(() => {
    getGmxStat()
  }, [getGmxStat])

  return <Container title='GMX Strategy' isCommonBg={true}>
    <div className="w-full h-full overflow-auto">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between px-6">
          <div className="flex flex-col items-center">
            <div className="text-[#666666] text-[1.25rem]">Total Assets</div>
            <div className="text-[#1a1a1a] text-[1.5rem] font-bold">${formatDecimal(statics?.totalMoney || 0, 2)}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#666666] text-[1.25rem]">Total Profit</div>
            <div className="text-[#1a1a1a] text-[1.5rem] font-bold">${formatDecimal(statics?.totalProfit || 0, 2)}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#666666] text-[1.25rem]">Live Trading Volume</div>
            <div className="text-[#1a1a1a] text-[1.5rem] font-bold">{statics?.count || 0}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center pt-4 overflow-auto ">
        {list.map((item, index) => <div className="w-[33.333%] p-2" key={index}>
          <Card {...item} toDetail={() => toDetail(item)} />
        </div>)}
        <div className="w-[33.333%]"></div>
        <div className="w-[33.333%]"></div>
        <div className="w-[33.333%]"></div>
      </div>
    </div>
    <AddLiveTrading visible={AddLiveTradingVisible} onCancel={() => setAddLiveTradingVisible(false)} />
  </Container>
}

export default CMXPageList