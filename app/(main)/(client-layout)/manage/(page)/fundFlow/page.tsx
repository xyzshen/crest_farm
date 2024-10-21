'use client'
import React from 'react';
import Container from '@/app/components/Container';
import { Select, Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { FundFlowApi } from '@/app/service/fundFlow-api';
import { AddFundFlow } from './modal/AddFundFlow';
import { enumToArray, enumToObject, formatTimeToTz } from '@/utils';
import { EStrategyMap } from '../overview/type';
import { EAssetsType, EAssetsTypeMap } from '@/app/service/fundFlow-api/type';

export default function Page() {

  const getTableData = (props: any): Promise<any> => {
    const { current, pageSize, type } = props;
    const query = {
      pageNumber: current,
      pageSize: pageSize,
      type
    }
    return FundFlowApi.getFundFlowList(query).then((res: any) => {
      return {
        total: res.totalCount,
        list: res.data,
      };
    })
  };

  const [visible, setVisible] = React.useState<boolean>(false)
  const [type, setType] = React.useState<string>('');
  const { tableProps, search } = useAntdTable((props) => getTableData({
    ...props,
    type
  }), {
    refreshDeps: [type]
  });

  const handleCancel = () => {
    setVisible(false);
    search.reset()
  }

  const onSelectType = (value: string) => {
    setType(value)
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
        return enumToObject(EAssetsType)[text]
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
        <div className='flex justify-between pb-4'>
          <div>
            <Select allowClear placeholder='选择操作类型' style={{ width: '10rem', marginRight: '1rem' }} options={enumToArray(EAssetsType)} onChange={onSelectType} />
          </div>

        </div>
        <div>
          <Table columns={columns} rowKey="email" {...tableProps} />
        </div>
      </div>
      <AddFundFlow visible={visible} onCancel={handleCancel} />
    </Container>
  );
}
