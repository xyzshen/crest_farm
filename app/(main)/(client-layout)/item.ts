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
    key: '/manage/overview',
    title: 'My portfolio',
    label: 'My portfolio',
    isLogin: true
  }
];