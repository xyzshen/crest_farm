import { Pagetion } from "@/app/types";


export interface IGetGMXListParams extends Pagetion {
  account?: string
}

export type TGmxData = {
  id: number;  // 策略id
  userId: number;  // 用户id
  userName?: string;  // 用户名
  exchangeType?: string;  // 交易所类型
  exchangeId: number;  // 交易所id
  symbol: string;  // 交易对
  evmAddress: string; // 钱包地址
  principal: number;  // 本金
  gmCount: number;   // GM数量
  gmInitValue: number;  // GM初始价值
  exchangeShortValue: number;  // 空单价值
  leverageSlider: number;  // 杠杆倍数
  volatility?: number;  // 平衡策略--按波动率
  priceStep?: number;  // 平衡策略--按价格步长
  timeStep?: number;   // 平衡策略-- 按时间步长
  status: number;   // 策略状态 1-已启动 0-已停止
  description?: string;
  createTime: string;
  profit?: number;   // 收益
  detail?: TGmxProfitDATA[];
  lastRunTime?: number // 最后运行时间
  shortInfo?: string;
}

export type TGmxStat = {
  user: string;  // 用户名
  account: string;  // 账号
  totalProfit: number;  // 总收益
  totalMoney: number;  // 总资产
}

export type TGmxProfitDATA = {
  id: number;  // 策略id
  instanceId: number;  // 实例id
  tokenCount: number;   // token数量
  usdtCount: number;   // usdt数量
  shortCount: number;   // 空单数量
  shortTokenValue: number;  // 空单价值
  fee?: number;   // 手续费
  gmPrice?: number;  // GM价格
  currentProfit: number;  // 当前收益
  currentApy?: number;  // 当前年化收益率
  description?: string;  // 描述
  createTime: string   // 创建时间
}

export interface TGmxStatListParams extends Pagetion {
  gmxId: number;
}

export interface TqueryGmxReportListParams extends TGmxStatListParams {
  type: string
}

export type TAddGmxData = Omit<TGmxData, 'userName' | 'id' | 'status' | 'createTime' | 'profit' | 'detail' | 'userName'>;

export type TEditGmxData = Omit<TGmxData, 'userName' | 'status' | 'createTime' | 'profit' | 'detail' | 'userName'>;