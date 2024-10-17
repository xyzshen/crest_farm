'use client'
import Container from "@/app/components/Container"
import Card from "./componenets/Card"
import { PlusOutlined } from "@ant-design/icons"
import { AddLiveTrading } from "./modal/AddLiveTrading"
import { useCallback, useEffect, useMemo, useState } from "react"
import { RealTradingApi } from "@/app/service/realTrading-api"
import { TGmxData } from "@/app/service/realTrading-api/type"
import { formatDecimal, formatNumber } from "@/utils"
import { useRouter } from "next/navigation"
import React from "react"
import { Switch } from "antd"

const CMXPageList = () => {
  const router = useRouter()
  const [gmxCardList, setGmxCardList] = useState<TGmxData[]>([])
  const [AddLiveTradingVisible, setAddLiveTradingVisible] = useState<boolean>(false)
  const [statics, setStatics] = useState<any>()
  const [showStopCard, setShowStopCard] = React.useState<boolean>(false);
  const [gmxTotal, setGmxTotal] = useState<number>(0)

  const toDetail = (item: any) => {
    sessionStorage.setItem('gmxData', JSON.stringify(item))
    router.push(`/manage/realTrading/gmx/${item.id}`)
  }

  const onChangeSwitch = (checked: boolean) => {
    setShowStopCard(checked);
  }

  const stopGmxCount = useMemo(() => {
    if (gmxTotal === 0) return 0
    if (statics?.count === 0) return 0
    if (statics && gmxTotal) {
      return gmxTotal - statics.count
    }
  }, [gmxTotal, statics])

  const fetchList = useCallback(() => {
    const query = {
      pageNumber: 1,
      pageSize: 100
    }
    RealTradingApi.getGMXList(query).then((res: any) => {
      if (res) {
        setGmxCardList(res.data)
        setGmxTotal(res.totalCount || 0)
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

  const list = useMemo(() => {
    return gmxCardList.filter(item => showStopCard ? item.status > 0 : item.status === 1).sort((a, b) => a.status - b.status)
  }, [gmxCardList, showStopCard])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  useEffect(() => {
    getGmxStat()
  }, [getGmxStat])

  return <Container title='GMX策略' isCommonBg={true} opt={
    <div className='absolute right-4 top-4 flex items-center'>
      <span className='inline-block pr-2 text-[#333] text-sm'>显示停止实盘</span>
      <Switch checked={showStopCard} onChange={onChangeSwitch} />
    </div>}>
    <div className="w-full h-full overflow-auto">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between px-6">
          <div className="flex flex-col items-center">
            <div className="text-[#666666] text-[1.25rem]">总资金</div>
            <div className="text-[#1a1a1a] text-[1.5rem] font-bold">${formatDecimal(statics?.totalMoney || 0, 2)}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#666666] text-[1.25rem]">总收益</div>
            <div className="text-[#1a1a1a] text-[1.5rem] font-bold">${formatDecimal(statics?.totalProfit || 0, 2)}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#666666] text-[1.25rem]">实盘数量</div>
            <div className="text-[#1a1a1a] text-[1.5rem] font-bold">{statics?.count || 0}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#666666] text-[1.25rem]">已停止实盘</div>
            <div className="text-[#1a1a1a] text-[1.5rem] font-bold">{stopGmxCount || 0}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center pt-4 overflow-auto ">
        {list.map((item, index) => <div className=" p-2 lg:w-[50%] xl:w-[33.333%]" key={index}>
          <Card {...item} toDetail={() => toDetail(item)} />
        </div>)}
        <div className="lg:w-[50%] xl:w-[33.333%]"></div>
        <div className="lg:w-[50%] xl:w-[33.333%]"></div>
        <div className="lg:w-[50%] xl:w-[33.333%]"></div>
      </div>
    </div>
    <AddLiveTrading visible={AddLiveTradingVisible} onCancel={() => setAddLiveTradingVisible(false)} />
  </Container>
}

export default CMXPageList