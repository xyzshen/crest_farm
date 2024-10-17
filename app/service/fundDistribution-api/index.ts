import api from "../api";
import fetchApi from "../base/fetchApi";
import { IFundDistribution, IGetFundDistributionParams, TAddFundDistributionData, TModFundDistributionData } from "./type";

class fundDistributionService {
  getFundDistributionList(data: IGetFundDistributionParams) {
    return fetchApi.get(api.fundDistribution.list, data);
  }
  addFundDistribution(data: TAddFundDistributionData) {
    return fetchApi.post(api.fundDistribution.add, data);
  }
  modFundDistribution(data: TModFundDistributionData) {
    return fetchApi.post(api.fundDistribution.mod, data);
  }
  delFundDistribution(id: number) {
    return fetchApi.post(api.fundDistribution.del, { id });
  }
}

export const fundDistributionApi = new fundDistributionService();