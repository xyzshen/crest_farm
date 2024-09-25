'use client'
import Container from "@/app/components/Container"
import { useAntdTable } from "ahooks"
import { RealTradingApi } from "@/app/service/realTrading-api"
import { useCallback, useEffect, useMemo, useState } from "react"
import LineChart from "../componenets/LineChart"
import Position from "../componenets/Position"
import Record from "../componenets/Record"
import { Button, message, Segmented, Table } from "antd"
import RealTimeProfit from "../componenets/RealTimeProfit"
import { formatNumber, formatWalletAddress } from "@/utils"
import EditStrategy from "../modal/EditStrategy"
import { AddLiveTrading } from "../modal/AddLiveTrading"
import { TGmxData } from "@/app/service/realTrading-api/type"
import dayjs from "dayjs"
import { useParams } from "next/navigation"

export interface TableParams {
  current: number;
  pageSize: number;
}


const getPositionData = (props: any) => {
  const { statics } = props
  return RealTradingApi.queryGmxReportList({ gmxId: statics.id, pageNumber: 1, pageSize: 1, type: 'quarter' }).then((res: any) => {
    return {
      list: res.data,
      total: res.totalCount
    }
  })
}

interface Result {
  list: any[];
  total: number
}

const getRecordData = (props: TableParams, formData: { gmxId: number }): Promise<any> => {
  const req = {
    gmxId: formData.gmxId,
    pageNumber: props.current,
    pageSize: props.pageSize
  }
  return RealTradingApi.queryOperationByPage(req).then((res: any) => {
    return {
      list: res.data,
      total: res.totalCount
    }
  })
}


export interface ISegmentedType {
  label: string,
  value: string
}

export interface TStatics extends TGmxData {
  totalProfit?: number;
  totalMoney?: number
}



const CMXPageDetail = () => {
  const [statics, setStatics] = useState<TGmxData | undefined>()
  const id = useParams().id
  const [logData, setLogData] = useState<any>([])
  const [editStrategyVisible, setEditStrategyVisible] = useState<boolean>(false)
  const [AddLiveTradingVisible, setAddLiveTradingVisible] = useState<boolean>(false)
  const [optType, setOptType] = useState<'start' | 'stop' | 'edit' | ''>('')

  const [segmentedType, setSegmentedType] = useState<string>('day')

  const [staticData, setStaticData] = useState<TGmxData | undefined>()

  const fetchLogData = async () => {
    const res: any = await RealTradingApi.queryGmxReportList({ gmxId: Number(id), pageNumber: 1, pageSize: 10000, type: 'quarter' }).then((res: any) => {
      if (res) {
        setLogData(res.data)
      }
    })
  }


  const fetchDetail = async (id: number) => {
    const res: any = await RealTradingApi.getGmxDetail(id);
    if (res) {
      setStatics(res.data)
    }
  }

  const onHandle = (value: string) => {
    if (value === 'start' && optType !== 'start') {
      setOptType('start')
      setEditStrategyVisible(true)
    } else if (value === 'edit') {
      setOptType('edit')
      setAddLiveTradingVisible(true)
    } else {
      setOptType('stop')
      setEditStrategyVisible(true)
    }
  }

  const onOk = () => {
    setEditStrategyVisible(false)
    setAddLiveTradingVisible(false)
    if (!statics) return
    RealTradingApi.updateGmxStatus({ gmxId: statics.id, status: optType === 'start' ? 1 : 0 }).then((res: any) => {
      message.success(optType === 'start' ? 'Start successful' : 'stop successful')
      fetchDetail(Number(id))
    })
  }
  const { tableProps: recordTableProps, search } = useAntdTable((props: TableParams) => getRecordData(props, { gmxId: Number(id) }), {
    refreshDeps: [id]
  });

  const queryGmxProfitList = useCallback(() => {
    RealTradingApi.queryGmxReportList({ gmxId: Number(id), pageNumber: 1, pageSize: 24, type: 'hour' }).then((res: any) => {
      if (res) {
        setStaticData(res.data)
      }
    })
  }, [])

  const queryGmxReportList = useCallback(() => {
    RealTradingApi.queryGmxReportList({ gmxId: Number(id), pageNumber: 1, pageSize: 30, type: 'day' }).then((res: any) => {
      if (res) {
        setStaticData(res.data)
      }
    })
  }, [])

  const { tableProps: positionTableProps } = useAntdTable(() => {
    if (statics) {
      return getPositionData({ statics })
    } else {
      return new Promise<any>((resolve, reject) => {
        const data = {
          total: 0,
          list: []
        }
        resolve(data)
      })
    }
  }, {
    refreshDeps: [statics]
  });


  useEffect(() => {
    fetchLogData()
  }, [])

  useEffect(() => {
    if (id) {
      fetchDetail(Number(id))
    }
  }, [id])


  useEffect(() => {
    if (segmentedType && segmentedType === 'day') {
      queryGmxReportList()
    } else if (segmentedType && segmentedType === 'hour') {
      queryGmxProfitList()
    }
  }, [segmentedType])

  return <Container title={statics?.symbol} isCommonBg={true}>
    <div className="w-full h-full overflow-auto">
      <div className="bg-white rounded-md py-6 px-10 flex flex-wrap justify-between text-base mb-6">
        <div className="flex w-[25%] pb-4">
          <div className="pr-2 text-[#666]">Address</div>
          <div className="text-[#1a1a1a] font-semibold">{formatWalletAddress(statics?.evmAddress || '')}</div>
        </div>
        <div className="flex w-[25%] pb-4">
          <div className="pr-2 text-[#666]">Symbol</div>
          <div className="text-[#1a1a1a] font-semibold">{statics?.symbol}</div>
        </div>
        <div className="flex w-[25%] pb-4">
          <div className="pr-2 text-[#666]">Exchange Type</div>
          <div className="text-[#1a1a1a] font-semibold">{statics?.exchangeType}</div>
        </div>
        <div className="flex w-[25%] pb-4">
          <div className="pr-2 text-[#666]">Create Time</div>
          <div className="text-[#1a1a1a] font-semibold">{dayjs(statics?.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <div className="flex w-[25%] pb-4">
          <div className="pr-2 text-[#666]">Total Profit</div>
          <div className="text-[#1a1a1a] font-semibold">{formatNumber(statics?.profit || 0)}</div>
        </div>
        <div className="flex w-[25%] pb-4">
          <div className="pr-2 text-[#666]">Principal</div>
          <div className="text-[#1a1a1a] font-semibold">${formatNumber(statics?.principal || 0)}</div>
        </div>
        <div className="flex w-[25%] pb-4">
          <div className="pr-2 text-[#666]">GM Count</div>
          <div className="text-[#1a1a1a] font-semibold">{statics?.gmCount}</div>
        </div>
      </div>
      <div className=" bg-white rounded-md p-6 mb-6">
        <div className="w-full h-[20rem] border-1 rounded-md">
          <LineChart data={logData} />
        </div>
      </div>
      <div className=" bg-white rounded-md p-6 mb-6">
        <div className="text-[1rem] text-[#1a1a1a] font-bold pb-4">Real-time Profit</div>
        <div className="w-full h-[20rem] border-1 rounded-md">
          <Position data={statics} tableProps={positionTableProps} />
        </div>
      </div>
      <RealTimeProfit segmentedType={segmentedType} setSegmentedType={setSegmentedType} data={statics} staticData={staticData} />
      <div className=" bg-white rounded-md p-6 mb-6">
        <div className="text-[1rem] text-[#1a1a1a] font-bold pb-4">Log Records</div>
        <div className="w-full h-[20rem] border-1 rounded-md">
          <Record tableProps={recordTableProps} />
        </div>
      </div>
    </div>
    {statics && <EditStrategy statics={statics} visible={editStrategyVisible} onCancel={() => setEditStrategyVisible(false)} type={optType} onOk={onOk} />}
    <AddLiveTrading data={statics} visible={AddLiveTradingVisible} onCancel={() => setAddLiveTradingVisible(false)} type="edit" />
  </Container>

}

export default CMXPageDetail