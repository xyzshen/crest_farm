
"use client"

import { Menu } from 'antd';
import { useState } from 'react';
import { Items } from '../item';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter()
  const [activeKey, setActiveKey] = useState<string>('')


  const onClick = (e: any) => {
    setActiveKey(e.key)
    router.push('/manage' + e.key)
  }


  return <div className='w-[200px] h-full bg-white  pt-4'>
    <Menu
      onClick={onClick}
      className={'sidebar-menus'}
      selectedKeys={[activeKey]}
      style={{ width: 200 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={Items}
    />
  </div>
}

export default Sidebar;