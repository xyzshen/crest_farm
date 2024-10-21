import { Pagetion } from "@/app/types";

export interface IGetFundFlowListParams extends Pagetion {
  account?: string
}

export interface AssetsData {
  id: number;
  amount: number; // 金额
  type: 'DEPOSIT' | 'WITHDRAW' | 'FEE'; // 充值、提现、手续费
  createTime: string // 创建时间
}

export enum EAssetsType {
  DEPOSIT = '充值',
  WITHDRAW = '提现',
  FEE = '手续费'
}

export const EAssetsTypeMap: any = {
  [EAssetsType.DEPOSIT]: '充值',
  [EAssetsType.WITHDRAW]: '提现',
  [EAssetsType.FEE]: '手续费'
}

export type TAddAssetsData = Omit<AssetsData, 'id' | 'createTime'>;