import { Pagetion } from "@/app/types";


export interface IFundDistribution {
  id: number;
  account: string;
  amount: number;
  strategy: string;
  status: number;
  address: string;
  description: string;
  platform: string;
  moneyDate: string;
}

export interface IGetFundDistributionParams extends Pagetion {
  account?: string
}

export type TAddFundDistributionData = Omit<IFundDistribution, 'id' | 'status'>;

export type TModFundDistributionData = Omit<IFundDistribution, 'status'>;