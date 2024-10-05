'use client'
import React from 'react';
import Container from '@/app/components/Container';
import { Button, Input, Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { FundFlowApi } from '@/app/service/fundFlow-api';
import dayjs from 'dayjs';
import { AddFundFlow } from './modal/AddFundFlow';
import { enumToObjectByKey, formatTimeToTz } from '@/utils';
import { EStrategy } from '../dividendRecord/page';

export default function Page() {

  const getTableData = (props: any): Promise<any> => {
    const { current, pageSize } = props;
    const query = {
      pageNumber: current,
      pageSize: pageSize
    }
    return FundFlowApi.getFundFlowList(query).then((res: any) => {
      return {
        total: res.totalCount,
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
      title: 'Account',
      dataIndex: 'account',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Strategy',
      dataIndex: 'strategy',
      render: (text: string) => {
        return text ? enumToObjectByKey(EStrategy)[text] : ''
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      render: (text: string) => {
        return formatTimeToTz(text, 'YYYY-MM-DD HH:mm:ss')
      }
    },
  ]
  return (
    <Container title='Fund Flow'>
      <div className='p-6'>
        <div>
          <Table columns={columns} rowKey="email" {...tableProps} />
        </div>
      </div>
      <AddFundFlow visible={visible} onCancel={handleCancel} />
    </Container>
  );
}
