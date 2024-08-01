
'use client'
import React, { useState } from 'react';
import { Button, ConfigProvider, Table, Modal, Form, Input, Select, Space } from 'antd'; "antd";
export default function TradingPost() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }
    ]
    const columns = [
        { title: 'Transaction name', dataIndex: 'name', key: 'name' },
        { title: 'Type of exchange', dataIndex: 'age', key: 'age' },
        { title: 'agreement', dataIndex: 'address', key: 'address' },
        { title: 'date', dataIndex: 'address', key: 'address' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span className='cursor-pointer' onClick={() => {
                        showModal()
                        console.log(record)
                    }}>Edit</span>
                    <span className='cursor-pointer' onClick={() => { console.log(record) }}>Delete</span>
                </Space>
            ),
        }
    ]

    const customTitle = (
        <div style={{ color: '#20253A;', fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>Add exchange</div>
    );
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="bg-[#fcfcfc] h-screen rounded-3xl w-screen mx-auto pt-[45px] px-[40px]">
            <span className='text-lg font-bold text-[#2C4E93] leading-7'>Trading Post</span>
            <div className='float-right'>
                <ConfigProvider
                    wave={{ disabled: true }}
                    theme={{
                        token: {
                            fontWeight: '500',
                        }
                    }}
                >
                    <Button type="primary" style={{ backgroundColor: '#1a1a1a' }} onClick={showModal}>Add Exchange</Button>
                </ConfigProvider>
            </div>
            <Modal
                open={open}
                title={customTitle}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(
                    <div className='text-center'>
                        <ConfigProvider
                            wave={{ disabled: true }}
                            theme={{
                                components: {
                                    Button: {
                                        colorPrimaryHover: '#1a1a1a',
                                        colorPrimaryTextHover: '#1a1a1a',
                                    }
                                }
                            }}
                        >
                            <Button key="back" style={{ backgroundColor: '#F2F2F2', height: '46px', padding: '14px 56px' }} onClick={handleCancel}>
                                Cancel
                            </Button>
                        </ConfigProvider>
                        <ConfigProvider
                            theme={{
                                token: {
                                    fontWeight: '500',

                                }
                            }}
                        >
                            <Button key="submit" type="primary" style={{ backgroundColor: '#1a1a1a', marginLeft: '10px', height: '46px', padding: '14px 18px' }} loading={loading} onClick={handleOk}>
                                Definite addition
                            </Button>,
                        </ConfigProvider>


                    </div>
                )}
            >
                <div className='text-[16px] text-[#333333] font-bold mb-[10px]'>
                    <span className='text-[#333333] text-[16px] font-[bold]'>Selection protocol</span>
                </div>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label=""
                        name="protocol"
                        labelCol={{ flex: '100px' }}
                        wrapperCol={{ flex: 'auto' }}

                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Select placeholder='cryptocurrency'
                            options={[{
                                value: 'cryptocurrency',
                                label: 'cryptocurrency'
                            }]}
                        ></Select>
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="tradingType"
                        labelCol={{ flex: '100px' }}
                        wrapperCol={{ flex: 'auto' }}

                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Select placeholder='cryptocurrency'
                            options={[{
                                value: 'Binance futures',
                                label: 'Binance futures'
                            },
                            {
                                value: 'okx futures',
                                label: 'okx futures'
                            }]}
                        ></Select>
                    </Form.Item>
                    {/* <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
                </Form>

                <div className='text-[16px] text-[#333333] font-bold mb-[10px]'>
                    <span className='text-[#333333] text-[16px] font-[bold]'>Configuration parameter</span>
                </div>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label=""
                        name="accessKey"
                        labelCol={{ flex: '100px' }}
                        wrapperCol={{ flex: 'auto' }}

                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input placeholder='Access Key'

                        ></Input>
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="secretKey"
                        labelCol={{ flex: '100px' }}
                        wrapperCol={{ flex: 'auto' }}

                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input placeholder='Secret Key'

                        ></Input>
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="binanceFutures"
                        labelCol={{ flex: '100px' }}
                        wrapperCol={{ flex: 'auto' }}

                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input placeholder='Binance futures'

                        ></Input>
                    </Form.Item>
                    {/* <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
                </Form>
            </Modal>
            <Table dataSource={data} columns={columns} style={{ paddingTop: '40px' }} />
        </div>
    )
}