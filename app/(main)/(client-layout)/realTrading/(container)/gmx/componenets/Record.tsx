'use client'
import { enumToObject, formatDecimal } from '@/utils';
import { Table } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

enum Opt {
  'open' = '开仓',
  'close' = '平仓',
  'increase' = '增加空单量',
  'decrease' = '减少空单'
}


const Record = (props: any) => {
  const { tableProps } = props;
  const optObj = enumToObject(Opt);
  const columns: any = [
    {
      title: '时间',
      dataIndex: 'createTime',
      render: (text: string) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
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
      title: '操作token数量',
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
      title: '协议中token数量',
      dataIndex: 'tokenCount',
    },
  ];
  return <Table columns={columns} {...tableProps} />
}

export default Record;