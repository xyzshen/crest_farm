import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number] & {
  isLogin?: boolean;
  children?: MenuItem[];
}

export const Items: MenuItem[] = [
  {
    key: '/strategy',
    title: 'Strategy',
    label: 'Strategy',
  },
  {
    key: '/overview',
    title: 'dashboard',
    label: 'dashboard',
    isLogin: true,
  },
  {
    key: '/fundFlow',
    title: 'assets',
    label: 'assets',
    isLogin: true,
  },
  {
    key: '/dividendRecord',
    title: 'dividend',
    label: 'dividend',
    isLogin: true,
  },
  {
    key: '/exchange',
    title: 'exchange',
    label: 'exchange',
    isLogin: true,
  },
  {
    key: '/realTrading',
    title: 'realTrading',
    label: 'realTrading',
    children: [
      {
        key: '/realTrading/gmx',
        title: 'GMX',
        label: 'GMX',
        isLogin: true,
      }
    ]
  },
];