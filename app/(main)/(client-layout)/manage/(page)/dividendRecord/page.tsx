'use client'
import React from 'react';
import Container from '@/app/components/Container';
import { Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { DividendRecordApi } from '@/app/service/dividendRecord-api';
import { formatTimeToTz } from '@/utils';
import { EStrategyMap } from '../overview/type';
import { DividendRecordType } from '@/app/service/dividendRecord-api/type';

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
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '本金',
      dataIndex: 'principal',
    },
    {
      title: '总收益',
      dataIndex: 'amount',
    },
    {
      title: '服务费',
      dataIndex: 'serviceFee',
    },
    {
      title: '实际收益',
      dataIndex: 'realAmount',
    },
    {
      title: '策略',
      dataIndex: 'strategy',
      render: (text: string) => {
        return text ? EStrategyMap[text] : ''
      }
    },
    {
      title: '策略备注',
      dataIndex: 'strategyDes',
      width: 180,
      // 超出隐藏
      ellipsis: true
    },
    {
      title: '实盘',
      dataIndex: 'instanceInfo',
      render: (text: string, record: DividendRecordType) => {
        return text ? record.account + '-' + JSON.parse(text).symbol : ''
      }
    },
    {
      title: 'APR',
      dataIndex: 'apr',
      render: (text: string) => {
        return text ? Number(text) + '%' : text
      }
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      render: (text: string) => {
        return text ? formatTimeToTz(text, 'YYYY-MM-DD') : ''
      }
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      render: (text: string) => {
        return text ? formatTimeToTz(text, 'YYYY-MM-DD') : ''
      }
    },
    {
      title: '备注',
      dataIndex: 'description',
      width: 180,
      // 超出隐藏
      ellipsis: true
    }
  ]
  return (
    <Container title='分红记录'>
      <div className='p-6'>
        <div>
          <Table columns={columns} rowKey="email" {...tableProps} scroll={{ x: 'max-content' }} />
        </div>
      </div>
    </Container>
  );
}
