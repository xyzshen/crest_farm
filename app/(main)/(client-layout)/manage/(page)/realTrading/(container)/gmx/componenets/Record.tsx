'use client'
import { enumToObject, formatDecimal, formatTimeToTz } from '@/utils';
import { Table } from 'antd';
import React, { useMemo } from 'react';

enum Opt {
  'open' = '开仓',
  'close' = '平仓',
  'increase' = '增加空单',
  'decrease' = '减少空单'
}


const Record = (props: any) => {
  const { tableProps, token0 = 'token' } = props;
  const optObj = enumToObject(Opt);
  const columns: any = useMemo(() => {
    return [
      {
        title: '时间',
        dataIndex: 'createTime',
        render: (text: string) => {
          return formatTimeToTz(text, 'YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text: string) => {
          return optObj[text]
        }
      },
      {
        title: `操作${token0}数量`,
        dataIndex: 'count',
      },
      {
        title: '开单消耗',
        dataIndex: 'openFee',
        render: (text: string) => {
          return text ? formatDecimal(text, 3) : '-'
        }
      },
      {
        title: '资金费率',
        dataIndex: 'fundFee',
      },
      {
        title: '持仓数量',
        dataIndex: 'shortCount',
      },
      {
        title: `协议中${token0}数量`,
        dataIndex: 'tokenCount',
        render: (text: string) => {
          return text ? formatDecimal(text, 3) : '-'
        }
      },
    ]
  }, [token0]);
  return <Table columns={columns} {...tableProps} pagination={false} />
}

export default Record;