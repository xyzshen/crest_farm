'use client'
import Container from "@/app/components/Container";
import { fundDistributionApi } from "@/app/service/fundDistribution-api";
import { IFundDistribution } from "@/app/service/fundDistribution-api/type";
import { enumToObject, enumToObjectByKey, formatTimeToTz, formatWalletAddress } from "@/utils";
import { useAntdTable } from "ahooks";
import { Button, Input, message, Modal, Switch, Table } from "antd"
import React, { useState } from "react";

const getTableData = (props: any): Promise<any> => {
  const { current, pageSize, account } = props;
  const query = {
    pageNumber: current,
    pageSize: pageSize,
    account
  }
  return fundDistributionApi.getFundDistributionList(query).then((res: any) => {
    return {
      total: res.totalCount || 0,
      list: res.data || []
    }
  })
}

const AssetsManage = () => {

  const [searchText, setSearchText] = useState<string>('');
  const [fundFlowData, setFundFlowData] = useState<IFundDistribution | undefined>(undefined);
  const [assetsManagemModalVisible, setAssetsManagemModalVisible] = useState<boolean>(false);


  const handleEdit = (record: IFundDistribution) => {
    setFundFlowData(record);
    setAssetsManagemModalVisible(true);
  };
  const handleDelete = (record: IFundDistribution) => {
    Modal.warning({
      title: '确认删除该条资金分布数据吗？',
      content: (
        <div>
          <p>删除后该条资金分布数据将无法恢复，确认删除？</p>
        </div>
      ),
      onOk() {
        fundDistributionApi.delFundDistribution(record.id).then((res: any) => {
          message.success('删除成功');
          search.reset();
        })
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  const onSearch = (value: string) => {
    setSearchText(value)
  };

  const { tableProps, search } = useAntdTable((props: any) => getTableData({
    ...props,
    account: searchText
  }), {
    refreshDeps: [searchText]
  });

  const onChangeStatus = (val: any, status: string) => {
    fundDistributionApi.modFundDistribution({
      ...val,
      status: status ? 0 : 1
    }).then(() => {
      message.success(status ? '启动成功' : '停止成功')
      handleCancel()
    })
  }

  const columns = [
    {
      title: '时间',
      dataIndex: 'moneyDate',
      render: (text: string) => {
        return text ? formatTimeToTz(text, 'YYYY-MM-DD') : ''
      }
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '策略',
      dataIndex: 'strategy',
    },
    {
      title: '本金',
      dataIndex: 'amount',
    },
    {
      title: '资金托管平台',
      dataIndex: 'platform',
    },
    {
      title: '地址',
      dataIndex: 'address',
      render: (text: string) => {
        return text ? formatWalletAddress(text) : '-'
      }
    },
    {
      title: '备注',
      dataIndex: 'description',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: string, record: any) => {
        return <Switch disabled checkedChildren="已运行" unCheckedChildren="已停止" onChange={() => onChangeStatus(record, text)} checked={!!text} />
      }
    },
  ]

  const handleCancel = () => {
    setAssetsManagemModalVisible(false);
    setFundFlowData(undefined);
    search.reset();
  }

  return <Container title='资金分布'>
    <div className='p-6 overflow-auto'>
      <div className='flex justify-between pb-4'>
        <Button type="primary" onClick={() => setAssetsManagemModalVisible(true)}>新增</Button>
        <Input.Search placeholder='搜索账号' onSearch={onSearch} style={{ width: '20rem' }} />
      </div>
      <div>
        <Table columns={columns} rowKey="email" {...tableProps} />
      </div>
    </div>
  </Container>
}

export default AssetsManage