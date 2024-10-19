import { Pagetion } from "@/app/types";

export interface IGetDividendRecordListParams extends Pagetion {
  account?: string
}

export interface DividendRecordType {
  id: number;
  account: string;
  amount: number;
  principal: number;
  realAmount: number;
  type?: string;
  createTime: string
  strategy: string;
  instanceInfo: string;
  serviceFee: number;
  commissionCharge: number;
  beginTime?: string;
  endTime?: string;
  strategy_des?: string;
  strategyDes?: string;
  apr?: number;
  description?: string;
}

export type TAddDividendRecordData = Omit<DividendRecordType, 'id' | 'createTime' | 'type'>;