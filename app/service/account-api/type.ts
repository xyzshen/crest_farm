export interface DataType {
  id: number;
  roleId: number;
  account: string;
  mail: string;
  createTime: number;
  description?: string
}

export interface IGetAccountInfoParams {
  pageNumber: number;
  pageSize: number;
  account?: string;
}

export type IAddAccountParams = Pick<DataType, 'account' | 'mail' | 'roleId' | 'description'> & { password: string }