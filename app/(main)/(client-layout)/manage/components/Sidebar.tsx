
"use client"

import { Menu } from 'antd';
import { useState } from 'react';
import { Items } from '../item';
import { useRouter } from 'next/navigation';
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import MoneyFunds from '/public/static/icons/moneyFunds.svg'
import DividendRecord from '/public/static/icons/dividendRecord.svg'
import Exchange from '/public/static/icons/exchange.svg'
import Account from '/public/static/icons/account.svg'
import RealTrading from '/public/static/icons/realTrading.svg'

const MenuIconMap: any = {
  overview: <DesktopOutlined />,
  user: <UserOutlined />,
  fundFlow: <MoneyFunds className='fill-[#858585] hover:fill-[#1a1a1a] w-4' />,
  dividendRecord: <DividendRecord className='fill-[#858585] hover:fill-[#1a1a1a] w-4' />,
  exchange: <Exchange className='fill-[#858585] hover:fill-[#1a1a1a] w-4' />,
  account: <Account className='fill-[#858585] hover:fill-[#1a1a1a] w-4' />,
  realTrading: <RealTrading className='fill-[#858585] hover:fill-[#1a1a1a] w-4' />
}


const Sidebar = () => {
  const router = useRouter()
  const [activeKey, setActiveKey] = useState<string>('')


  const onClick = (e: any) => {
    setActiveKey(e.key)
    router.push('/manage' + e.key)
  }

  const items = Items.map(item => {
    const key: any = String(item?.key)?.substring(1) || ''
    return {
      ...item,
      icon: MenuIconMap[key]
    }
  })


  return <div className='w-[200px] h-full bg-white  pt-4'>
    <Menu
      onClick={onClick}
      className={'sidebar-menus'}
      selectedKeys={[activeKey]}
      style={{ width: 200 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  </div>
}

export default Sidebar;