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
import { formatAppSecret, formatTimeToTz } from '@/utils';
import dayjs from 'dayjs';


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
    setExchangeAccountData(undefined)
    search.reset()
  }

  const handleEdit = (data: ExchangeDataType) => {
    setExchangeAccountModalVisible(true);
    setExchangeAccountData(data);
  }

  const handleDelete = (data: ExchangeDataType) => {
    Modal.warning({
      title: 'Confirm the deletion of this exchange account?',
      content: (
        <div>
          <p>After deletion, the platform will no longer be able to operate transactions for this exchange account, and the account cannot be recovered.</p>
        </div>
      ),
      onOk() {
        ExchangeApi.deleteExchange(data.id).then((res: any) => {
          message.success('Deletion successful.');
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
      title: '账号名',
      dataIndex: 'aliasName',
      render: (text: string) => {
        return <span>{text || '-'}</span>
      }
    },
    {
      title: '交易所',
      dataIndex: 'protocol',
    },
    {
      title: 'App key',
      dataIndex: 'accessKey',
      render: (text: string) => {
        return <>
          <span>{formatAppSecret(text)}</span>
          <CopyToClipboard text={text} onCopy={() => message.success('Copy successful.')}>
            <CopyOutlined className='text-blue-500 cursor-pointer' />
          </CopyToClipboard>
        </>
      }
    },
    // {
    //   title: 'Phase password',
    //   dataIndex: 'phasePassword',
    //   render: (text: string) => {
    //     return <>
    //       <span>{text || '-'}</span>
    //       {text && <CopyToClipboard text={text} onCopy={() => message.success('Copy successful.')}>
    //         <CopyOutlined className='text-blue-500 cursor-pointer' />
    //       </CopyToClipboard>}
    //     </>
    //   }
    // },
    {
      title: 'ip白名单',
      width: 240,
      dataIndex: 'whitelistIp'
    },
    {
      title: '创建时间',
      width: 200,
      dataIndex: 'createTime',
      render: (text: string) => {
        return text ? formatTimeToTz(text, 'YYYY-MM-DD HH:mm:ss') : text
      }
    },
    {
      title: '操作',
      width: 180,
      render: (text: string, record: any) => {
        return (
          <div>
            <Button type="link" onClick={() => handleEdit(record)}>修改</Button>
            <Button type="link" danger onClick={() => handleDelete(record)}>删除</Button>
          </div>
        )
      }
    }
  ]

  return (
    <Container title='交易所管理'>
      <div className='p-6'>
        {/* <div className='pb-4'>
          <Segmented<string>
            options={typeList}
            onChange={(value) => {
              setActiveKey(value);
            }}
          />
        </div> */}
        <div className='flex justify-between pb-4'>
          <Button type='primary' onClick={() => setExchangeAccountModalVisible(true)}>Add</Button>
        </div>
        <div>
          <Table columns={columns} rowKey="email" {...tableProps} />
        </div>
      </div>
      <ExchangeAccountModal visible={exchangeAccountModalVisible} onCancel={handleModalCancle} data={exchangeAccountData} />
    </Container>
  );
}
