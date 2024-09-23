'use client'
import React from 'react';
import { Button, Input, message, Modal, Segmented, Table } from 'antd';
import { useAntdTable } from 'ahooks';
import ExchangeAccountModal from './modal/ExchangeAccountModal';
import { CopyOutlined } from '@ant-design/icons';
import { ExchangeApi } from '@/app/service/exchange-api';
import { ExchangeDataType } from '@/app/service/exchange-api/type';
import Container from '@/app/components/Container';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export interface Result {
  total: number;
  list: any[];
}

interface TableParams {
  current: number;
  pageSize: number;
}

const getTableData = (props: TableParams): Promise<Result> => {
  const { current, pageSize } = props;
  const query = {
    pageNumber: current,
    pageSize: pageSize
  }
  return ExchangeApi.getExchangeList(query).then((res: any) => {
    return {
      total: res.totalCount,
      list: res.data,
    };
  })
};

export default function Page() {
  const [typeList, setTypeList] = React.useState<string[]>(['all', 'okx', 'biance']);
  const [activeKey, setActiveKey] = React.useState<string>('all');
  const [exchangeAccountData, setExchangeAccountData] = React.useState<ExchangeDataType | undefined>(undefined);
  const [exchangeAccountModalVisible, setExchangeAccountModalVisible] = React.useState<boolean>(false);

  const { tableProps, search } = useAntdTable(getTableData);

  const handleModalCancle = () => {
    setExchangeAccountModalVisible(false);
    search.reset()
  }

  const handleEdit = (data: ExchangeDataType) => {
    setExchangeAccountModalVisible(true);
    setExchangeAccountData(data);
  }

  const handleDelete = (data: ExchangeDataType) => {
    Modal.warning({
      title: '确认删除改交易所账号？',
      content: (
        <div>
          <p>删除后平台将无法操作该交易所账号的交易，且账号不可恢复</p>
        </div>
      ),
      onOk() {
        ExchangeApi.deleteExchange(data.id).then((res: any) => {
          message.success('删除成功');
          search.reset();
        })
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  const columns = [
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '所属交易所',
      dataIndex: 'protocol',
    },
    {
      title: 'App key',
      dataIndex: 'accessKey',
      render: (text: string) => {
        return <>
          <span>{text}</span>
          <CopyToClipboard text={text} onCopy={() => message.success('复制成功')}>
            <CopyOutlined className='text-blue-500 cursor-pointer' />
          </CopyToClipboard>
        </>
      }
    },
    {
      title: 'App secrit',
      dataIndex: 'accessSecret',
      render: (text: string) => {
        return <>
          <span>{text}</span>
          <CopyToClipboard text={text} onCopy={() => message.success('复制成功')}>
            <CopyOutlined className='text-blue-500 cursor-pointer' />
          </CopyToClipboard>
        </>
      }
    },
    {
      title: 'Phase password',
      dataIndex: 'phasePassword',
      render: (text: string) => {
        return <>
          <span>{text || '-'}</span>
          {text && <CopyToClipboard text={text} onCopy={() => message.success('复制成功')}>
            <CopyOutlined className='text-blue-500 cursor-pointer' />
          </CopyToClipboard>}
        </>
      }
    },
    {
      title: 'IP 白名单',
      dataIndex: 'whiteListIp'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (text: string, record: any) => {
        return (
          <div>
            <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
            <Button type="link" danger onClick={() => handleDelete(record)}>删除</Button>
          </div>
        )
      }
    }
  ]

  return (
    <Container title='交易所管理'>
      <div className='p-6'>
        <div className='pb-4'>
          <Segmented<string>
            options={typeList}
            onChange={(value) => {
              setActiveKey(value);
            }}
          />
        </div>
        <div className='flex justify-between pb-4'>
          <Button type='primary' onClick={() => setExchangeAccountModalVisible(true)}>新增</Button>
          <Input.Search placeholder='搜索账号' style={{ width: '20rem' }} />
        </div>
        <div>
          <Table columns={columns} rowKey="email" {...tableProps} />
        </div>
      </div>
      <ExchangeAccountModal visible={exchangeAccountModalVisible} onCancel={handleModalCancle} data={exchangeAccountData} />
    </Container>
  );
}
