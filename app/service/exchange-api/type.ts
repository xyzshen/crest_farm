import { Pagetion } from "@/app/types";

export interface IGetExchangeListParams extends Pagetion {
  account?: string
}

export interface ExchangeDataType {
  id: number;
  account: string;
  protocol: string;
  commodity: string;
  tag?: string;
  accessKey: string;
  accessSecret?: string;
  phasePassword?: string;
  createTime: string;
  whitelistIp?: string
}

export type TAddExchangeData = Omit<ExchangeDataType, 'id' | 'createTime' | 'tag'>;

export type TUpdateExchangeData = Omit<ExchangeDataType, 'createTime' | 'tag'>;