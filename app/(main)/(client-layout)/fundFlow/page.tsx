'use client'
import React from 'react';
import Container from '@/app/components/Container';
import { Button, Input, Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { FundFlowApi } from '@/app/service/fundFlow-api';
import dayjs from 'dayjs';
import { AddFundFlow } from './modal/AddFundFlow';

export default function Page() {

  const getTableData = (props: any): Promise<any> => {
    const { current, pageSize } = props;
    const query = {
      pageNumber: current,
      pageSize: pageSize
    }
    return FundFlowApi.getFundFlowList(query).then((res: any) => {
      return {
        total: res.total,
        list: res.data,
      };
    })
  };

  const [visible, setVisible] = React.useState<boolean>(false)

  const { tableProps, search } = useAntdTable(getTableData);

  const handleCancel = () => {
    setVisible(false);
    search.reset()
  }

  const columns = [
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '金额',
      dataIndex: 'amount',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      render: (text: string) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  ]
  return (
    <Container title='资金流水'>
      <div className='p-6'>
        <div className='flex justify-between pb-4'>
          <Input.Search placeholder='搜索账号' style={{ width: '20rem' }} />
        </div>
        <div>
          <Table columns={columns} rowKey="email" {...tableProps} />
        </div>
      </div>
      <AddFundFlow visible={visible} onCancel={handleCancel} />
    </Container>
  );
}
