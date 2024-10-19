'use client'
import React from 'react';
import Container from '@/app/components/Container';
import { Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { FundFlowApi } from '@/app/service/fundFlow-api';
import { AddFundFlow } from './modal/AddFundFlow';
import { formatTimeToTz } from '@/utils';
import { EStrategyMap } from '../overview/type';

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
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (text: string) => {
        return EStrategyMap[text]
      }
    },
    {
      title: '金额',
      dataIndex: 'amount',
    },
    {
      title: '时间',
      dataIndex: 'moneyDate',
      render: (text: string) => {
        return text ? formatTimeToTz(text, 'YYYY-MM-DD') : ''
      }
    },
    {
      title: '备注',
      dataIndex: 'description',
      width: 200,
    },
  ]

  return (
    <Container title='资金流水'>
      <div className='p-6'>
        <div>
          <Table columns={columns} rowKey="email" {...tableProps} />
        </div>
      </div>
      <AddFundFlow visible={visible} onCancel={handleCancel} />
    </Container>
  );
}
