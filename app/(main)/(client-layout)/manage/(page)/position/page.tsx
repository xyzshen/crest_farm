'use client'
import Container from "@/app/components/Container";
import { PositionApi } from "@/app/service/position-api";
import { formatDecimal } from "@/utils";
import { useAntdTable } from "ahooks";
import { Input, Table } from "antd"
import { useState } from "react";



const PositionManagement = () => {

  const getTableData = (props: any): Promise<any> => {
    return PositionApi.getPositionList(props.account ? {
      account: props.account
    } : {}).then((res: any) => {
      return {
        total: res.totalCount,
        list: res.data,
      };
    })
  }

  const [searchText, setSearchText] = useState<string>('');

  const { tableProps, search } = useAntdTable((props: any) => getTableData({
    ...props,
    account: searchText
  }), {
    refreshDeps: [searchText]
  });

  const onSearch = (value: string) => {
    setSearchText(value)
  }


  const columns = [
    {
      title: '交易对',
      dataIndex: 'symbol',
    },
    {
      title: '持仓成本价',
      dataIndex: 'entryPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '初始保证金',
      dataIndex: 'initialMargin',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '保证金',
      dataIndex: 'maintMargin',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '持仓所需起始保证金',
      dataIndex: 'positionInitialMargin',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '开仓均价',
      dataIndex: 'entryPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '盈亏平衡价',
      dataIndex: 'breakEvenPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '参考强平价格',
      dataIndex: 'liquidationPrice',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '是否逐仓',
      dataIndex: 'isolated',
      render: (text: string) => {
        return text ? '是' : '否'
      }
    },
    {
      title: '杠杆倍率',
      dataIndex: 'leverage',
    },
    {
      title: '价值',
      dataIndex: 'notional',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '持仓数量',
      dataIndex: 'positionAmt',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
    {
      title: '持仓方向',
      dataIndex: 'positionSide',
    },
    {
      title: '持仓未实现盈亏',
      dataIndex: 'unrealizedProfit',
      render: (text: string) => {
        return formatDecimal(text, 4)
      }
    },
  ]

  return <Container title='持仓管理'>
    <div className='p-6 overflow-auto'>
      <div className='flex justify-between pb-4'>
        <Input.Search placeholder='搜索账号' onSearch={onSearch} style={{ width: '20rem' }} />
      </div>
      <div>
        <Table columns={columns} rowKey="id" {...tableProps} scroll={{ x: 'max-content' }} />
      </div>
    </div>
  </Container>
}

export default PositionManagement