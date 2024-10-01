import fetchApi from '../base/fetchApi';
import api from '../api';
import { IGetFundFlowListParams, TAddAssetsData } from './type';

class FoundFlowService {
  getFundFlowList(data: IGetFundFlowListParams) {
    return fetchApi.get(api.assets.list, data);
  }
  addFundFlow(data: TAddAssetsData) {
    return fetchApi.post(api.assets.add, data);
  }
}

export const FundFlowApi = new FoundFlowService();