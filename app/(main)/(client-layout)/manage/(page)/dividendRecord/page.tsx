'use client'
import React from 'react';
import Container from '@/app/components/Container';
import { Button, Input, Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { DividendRecordApi } from '@/app/service/dividendRecord-api';
import dayjs from 'dayjs';
import AddDividendRecord from './modal/AddDividendRecord';

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
      title: 'Account',
      dataIndex: 'account',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      render: (text: string) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  ]
  return (
    <Container title='Dividend Record'>
      <div className='p-6'>
        <div>
          <Table columns={columns} rowKey="email" {...tableProps} />
        </div>
      </div>
      <AddDividendRecord visible={visible} onCancel={handleCancel} />
    </Container>
  );
}
