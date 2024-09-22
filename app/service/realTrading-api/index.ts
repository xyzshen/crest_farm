import fetchApi from '../base/fetchApi';
import api from '../api'
import { IGetGMXListParams, TAddGmxData, TEditGmxData, TGmxStatListParams, TqueryGmxReportListParams } from './type';
import { urlParams } from '@/utils';

class RealTradingService {
  // 获取GMX策略收益信息
  getGMXList(data: IGetGMXListParams) {
    return fetchApi.get(api.gmx.list, data);
  }
  addGMX(data: TAddGmxData) {
    return fetchApi.post(api.gmx.add, data);
  }
  updateGmx(data: TEditGmxData) {
    return fetchApi.post(api.gmx.update, data);
  }
  getGmxStat() {
    return fetchApi.get(api.gmx.stat);
  }
  updateGmxStatus(data: { gmxId: number, status: number }) {
    return fetchApi.post(`${api.gmx.updateStatus}?${urlParams(data)}`, data);
  }
  queryGmxProfitList(data: TGmxStatListParams) {
    return fetchApi.get(`${api.gmx.queryGmxProfitList}?${urlParams(data)}`);
  }
  getGmxDetail(id: number) {
    return fetchApi.get(`${api.gmx.detail}?gmxId=${id}`);
  }
  queryGmxReportList(data: TqueryGmxReportListParams) {
    return fetchApi.get(`${api.gmx.queryGmxReportList}?${urlParams(data)}`);
  }
  queryOperationByPage(data: TGmxStatListParams) {
    return fetchApi.get(`${api.gmx.queryOperationByPage}?${urlParams(data)}`);
  }
  getGmxProfit(data: { gmxId: number }) {
    return fetchApi.get(`${api.gmx.getGmxProfit}?${urlParams(data)}`);
  }
}

export const RealTradingApi = new RealTradingService();