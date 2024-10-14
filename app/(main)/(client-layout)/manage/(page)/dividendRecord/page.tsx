'use client'
import React from 'react';
import Container from '@/app/components/Container';
import { Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { DividendRecordApi } from '@/app/service/dividendRecord-api';
import AddDividendRecord from './modal/AddDividendRecord';
import { formatTimeToTz } from '@/utils';
import { EStrategyMap } from '../overview/type';

export default function Page() {

  const getTableData = (props: any): Promise<any> => {
    const { current, pageSize } = props;
    const query = {
      pageNumber: current,
      pageSize: pageSize
    }
    return DividendRecordApi.getDividendRecordList(query).then((res: any) => {
      return {
        total: res.totalCount,
        list: res.data,
      };
    })
  };

  const { tableProps, search } = useAntdTable(getTableData);
  const [visible, setVisible] = React.useState<boolean>(false)

  const onAdd = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    search.reset()
    setVisible(false)
  }

  const columns = [
    {
      title: '金额',
      dataIndex: 'amount',
    },
    {
      title: '服务费',
      dataIndex: 'serviceFee',
    },
    {
      title: '手续费',
      dataIndex: 'commissionCharge',
    },
    {
      title: '策略',
      dataIndex: 'strategy',
      render: (text: string) => {
        return text ? EStrategyMap[text] : ''
      }
    },
    {
      title: '实盘',
      dataIndex: 'instanceInfo',
      render: (text: any) => {
        return text ? JSON.parse(text)?.symbol : ''
      }
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      render: (text: string) => {
        return formatTimeToTz(text, 'YYYY-MM-DD HH:mm:ss')
      }
    },
  ]
  return (
    <Container title='分红记录'>
      <div className='p-6'>
        <div>
          <Table columns={columns} rowKey="email" {...tableProps} />
        </div>
      </div>
      <AddDividendRecord visible={visible} onCancel={handleCancel} />
    </Container>
  );
}
