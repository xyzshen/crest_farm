import { Pagetion } from "@/app/types";

export interface IGetDividendRecordListParams extends Pagetion {
  account?: string
}

export interface DividendRecordType {
  id: number;
  account: string;
  amount: number;
  type?: string;
  createTime: string
}

export type TAddDividendRecordData = Omit<DividendRecordType, 'id' | 'createTime' | 'type'>;