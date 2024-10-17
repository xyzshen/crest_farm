import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number] & {
  isLogin?: boolean;
  children?: MenuItem[];
}

export const Items: MenuItem[] = [
  {
    key: '/overview',
    title: '数据概览',
    label: '数据概览',
    isLogin: true,
  },
  // {
  //   key: '/tradingPost',
  //   title: 'tradingPost',
  //   label: 'tradingPost',
  //   isLogin: true,
  // },
  {
    key: '/fundFlow',
    title: '资金流水',
    label: '资金流水',
    isLogin: true,
  },
  {
    key: '/assetsManage',
    title: '资金分布',
    label: '资金分布',
    isLogin: true,
  },
  {
    key: '/dividendRecord',
    title: '分红记录',
    label: '分红记录',
    isLogin: true,
  },
  {
    key: '/exchange',
    title: '交易所管理',
    label: '交易所管理',
    isLogin: true,
  },
  {
    key: '/realTrading',
    title: '实盘管理',
    label: '实盘管理',
    children: [
      {
        key: '/realTrading/gmx',
        title: 'GMX',
        label: 'GMX',
        isLogin: true,
      }
    ],
  },
  {
    key: '/position',
    title: '持仓管理',
    label: '持仓管理',
    isLogin: true,
  },
];