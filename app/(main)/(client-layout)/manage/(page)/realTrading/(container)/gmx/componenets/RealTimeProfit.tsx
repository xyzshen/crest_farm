'use client'
import { Segmented, Table } from "antd"
import BarChart from "./BarChart"
import dayjs from "dayjs"
import { formatDecimal } from "@/utils"
import { TGmxData } from "@/app/service/realTrading-api/type"
import { useMemo } from "react"

interface IRealTimeProfit {
  segmentedType: string,
  setSegmentedType: (value: string) => void,
  staticData: any;
  data?: TGmxData
}

const segmentedTypeList = [
  {
    label: '30 days',
    value: 'day'
  },
  {
    label: '24 hours',
    value: 'hour'
  }
]



const RealTimeProfit = (props: IRealTimeProfit) => {

  const { segmentedType, setSegmentedType, staticData, data } = props

  const list = useMemo(() => {
    // 数组反转
    if (staticData && staticData.length > 0) {
      return staticData?.reverse()
    }
    return []
  }, [staticData])

  const tableList = useMemo(() => {
    if (list.length > 0) {
      // 取后10条数据
      return list.slice(0, 9)
    }
  }, [list])

  const columns = [
    {
      title: 'Time',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: 'Principal',
      dataIndex: 'principal',
      key: 'principal',
      render: (text: string) => {
        return formatDecimal(data?.principal || 0, 4)
      }
    },
    {
      title: 'LP Value',
      dataIndex: 'LPValue',
      key: 'LPValue',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'Short Token Value',
      dataIndex: 'shortTokenValue',
      key: 'shortTokenValue',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'USDC Count',
      dataIndex: 'usdtCount',
      key: 'usdtCount',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'GM Price',
      dataIndex: 'gmPrice',
      key: 'gmPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'Funding Rate',
      dataIndex: 'fundingRate',
      key: 'fundingRate',
      render: (text: any) => {
        return text ? (text * 100).toFixed(2) + '%' : 0
      }
    },
    {
      title: 'Open Fee',
      dataIndex: 'fee',
      key: 'fee',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'Current Profit',
      dataIndex: 'currentProfit',
      key: 'currentProfit',
      render: (text: string) => {
        return formatDecimal(text, 8)
      }
    },
    {
      title: 'Total Profit',
      dataIndex: 'totalProfit',
      key: 'totalProfit',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: 'APY',
      dataIndex: 'currentApy',
      render: (text: string) => {
        return text ? formatDecimal(text, 3) + '%' : 0
      }
    }
  ]

  return <div className=" bg-white rounded-md p-6 mb-6">
    <div className="pb-4">
      <Segmented<string>
        options={segmentedTypeList}
        onChange={(value) => {
          setSegmentedType(value)
        }}
      />
    </div>

    <BarChart data={list} type={segmentedType || ''} />
    <div>
      <Table columns={columns} dataSource={tableList} />
    </div>
  </div>
}

export default RealTimeProfit