'use client'
import Container from "@/app/components/Container"
import { useAntdTable } from "ahooks"
import { RealTradingApi } from "@/app/service/realTrading-api"
import { useCallback, useEffect, useMemo, useState } from "react"
import LineChart from "../componenets/LineChart"
import Position from "../componenets/Position"
import Record from "../componenets/Record"
import { Button, message, Pagination, Segmented, Table } from "antd"
import RealTimeProfit from "../componenets/RealTimeProfit"
import { formatDecimal, formatNumber, formatTimeToTz, formatWalletAddress } from "@/utils"
import EditStrategy from "../modal/EditStrategy"
import { AddLiveTrading } from "../modal/AddLiveTrading"
import { TGmxData } from "@/app/service/realTrading-api/type"
import dayjs from "dayjs"
import { useParams } from "next/navigation"
import Short from "../componenets/Short"
import { RedoOutlined } from "@ant-design/icons"

export interface TableParams {
  current: number;
  pageSize: number;
}


const getPositionData = (props: any) => {
  const { statics } = props
  return RealTradingApi.getGmxProfit({ gmxId: statics.id }).then((res: any) => {
    return {
      list: res?.data ? [res.data] : [],
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
  const [spin, setSpin] = useState<boolean>(false)
  const [staticData, setStaticData] = useState<TGmxData | undefined>()
  const [logPage, setLogPage] = useState<number>(1)
  const [logPageSize, setLogPageSize] = useState<number>(1000)
  const [logTotal, setLogTotal] = useState<number>(0)

  const fetchLogData = useCallback(() => {
    RealTradingApi.queryGmxReportList({ gmxId: Number(id), pageNumber: logPage, pageSize: logPageSize, type: 'quarter' }).then((res: any) => {
      if (res) {
        setLogData(res?.data?.reverse() || [])
        setLogTotal(res.totalCount || 0)
      }
    })
  }, [logPage, logPageSize, id])

  const onShowSizeChange = (current: number, pageSize: number) => {
    setLogPageSize(pageSize)
    setLogPage(1)
  }

  const token0 = useMemo(() => {
    if (statics?.symbol) {
      return statics.symbol.substring(0, statics.symbol.length - 4)
    }
  }, [statics?.symbol])


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
        setStaticData(res.data || [])
      }
    })
  }, [])

  const queryGmxReportList = useCallback(() => {
    RealTradingApi.queryGmxReportList({ gmxId: Number(id), pageNumber: 1, pageSize: 30, type: 'day' }).then((res: any) => {
      if (res) {
        setStaticData(res.data || [])
      }
    })
  }, [])

  const { tableProps: positionTableProps, search: searchPosition } = useAntdTable(() => {
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

  const handleReset = async () => {
    setSpin(true);
    await searchPosition?.reset();
    setTimeout(() => {
      setSpin(false);
    }, 1000)
  }

  const shortDetail = useMemo(() => {
    if (statics && statics?.shortInfo) {
      const obj = JSON.parse(statics?.shortInfo)
      return [obj]
    }
    return []
  }, [statics])


  useEffect(() => {
    fetchLogData()
  }, [fetchLogData])

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

  return <Container isBack={true} title={statics?.symbol} isCommonBg={true}>
    <div className="w-full h-full overflow-auto">
      <div className="bg-white rounded-md py-6 px-10 flex flex-wrap justify-between text-base mb-6">
        <div className="flex w-[33%] pb-4">
          <div className="pr-2 text-[#666]">交易币对</div>
          <div className="text-[#1a1a1a] font-semibold">{statics?.symbol}</div>
        </div>
        <div className="flex w-[33%] pb-4">
          <div className="pr-2 text-[#666]">交易所</div>
          <div className="text-[#1a1a1a] font-semibold">{statics?.exchangeType}</div>
        </div>
        <div className="flex w-[33%] pb-4">
          <div className="pr-2 text-[#666]">创建时间</div>
          <div className="text-[#1a1a1a] font-semibold">{statics?.createTime ? formatTimeToTz(statics?.createTime, 'YYYY-MM-DD HH:mm:ss') : ''}</div>
        </div>
        <div className="flex w-[33%] pb-4">
          <div className="pr-2 text-[#666]">总收益</div>
          <div className="text-[#1a1a1a] font-semibold">{formatDecimal(statics?.profit || 0, 4)}</div>
        </div>
        <div className="flex w-[33%] pb-4">
          <div className="pr-2 text-[#666]">本金</div>
          <div className="text-[#1a1a1a] font-semibold">${formatDecimal(statics?.principal || 0, 2)}</div>
        </div>
        <div className="flex w-[33%] pb-4">
          <div className="pr-2 text-[#666]">gm 数量</div>
          <div className="text-[#1a1a1a] font-semibold">{statics?.gmCount}</div>
        </div>
        <div className="flex w-full pb-4">
          <div className="pr-2 text-[#666]">地址</div>
          <div className="text-[#1a1a1a] font-semibold">{statics?.evmAddress || ''}</div>
        </div>
      </div>
      <div className=" bg-white rounded-md p-6 mb-6">
        <div className="w-full h-[20rem] border-1 rounded-md">
          <LineChart data={logData} />
          <Pagination
            className="flex justify-end mt-4"
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={(page) => setLogPage(page)}
            current={logPage}
            pageSize={logPageSize}
            total={logTotal}
          />
        </div>
      </div>
      <div className=" bg-white rounded-md p-6 mb-6">
        <div className="text-[1rem] text-[#1a1a1a] font-bold pb-4">实时收益</div>
        <div className="flex justify-end pr-4 pb-4">
          <RedoOutlined className="cursor-pointer" spin={spin} onClick={handleReset} />
        </div>
        <div className="w-full h-[10rem] border-1 rounded-md">
          <Position data={statics} tableProps={positionTableProps} token0={token0} />
        </div>
      </div>
      <Short data={shortDetail} />
      <RealTimeProfit segmentedType={segmentedType} token0={token0} setSegmentedType={setSegmentedType} data={statics} staticData={staticData} />
      <div className=" bg-white rounded-md p-6 mb-6">
        <div className="text-[1rem] text-[#1a1a1a] font-bold pb-4">日志记录</div>
        <div className="w-full h-[20rem] border-1 rounded-md">
          <Record tableProps={recordTableProps} token0={token0} />
        </div>
      </div>
    </div>
    {statics && <EditStrategy statics={statics} visible={editStrategyVisible} onCancel={() => setEditStrategyVisible(false)} type={optType} onOk={onOk} />}
    <AddLiveTrading data={statics} visible={AddLiveTradingVisible} onCancel={() => setAddLiveTradingVisible(false)} type="edit" />
  </Container>

}

export default CMXPageDetail