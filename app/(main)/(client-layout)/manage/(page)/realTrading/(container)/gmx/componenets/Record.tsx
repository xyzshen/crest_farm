'use client'
import { enumToObject, formatDecimal } from '@/utils';
import { Table } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

enum Opt {
  'open' = 'Open Position',
  'close' = 'Close Position',
  'increase' = 'Increase',
  'decrease' = 'Decrease'
}


const Record = (props: any) => {
  const { tableProps } = props;
  const optObj = enumToObject(Opt);
  const columns: any = [
    {
      title: 'Time',
      dataIndex: 'createTime',
      render: (text: string) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: 'Action',
      dataIndex: 'operate',
      render: (text: string) => {
        return optObj[text]
      }
    },
    {
      title: 'Count',
      dataIndex: 'count',
    },
    {
      title: 'Open Fee',
      dataIndex: 'openFee',
      render: (text: string) => {
        return text ? formatDecimal(text, 3) : '-'
      }
    },
    {
      title: 'Fund Fee',
      dataIndex: 'fundFee',
      render: (text: string) => {
        return text ? formatDecimal(text, 3) : '-'
      }
    },
    {
      title: 'Short Count',
      dataIndex: 'shortCount',
    },
    {
      title: 'Token Count',
      dataIndex: 'tokenCount',
      render: (text: string) => {
        return text ? formatDecimal(text, 3) : '-'
      }
    },
  ];
  return <Table columns={columns} {...tableProps} />
}

export default Record;