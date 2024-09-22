import fetchApi from '../base/fetchApi';
import api from '../api';
import exchangeList from './mock'
import { IGetExchangeListParams, TAddExchangeData, TUpdateExchangeData } from './type';

class ExchangeService {
  getExchangeList(data: IGetExchangeListParams) {
    return fetchApi.get(api.exchange.list, data);
  }
  addExchange(data: TAddExchangeData) {
    return fetchApi.post(api.exchange.add, data);
  }
  updateExchange(data: TUpdateExchangeData) {
    return fetchApi.post(api.exchange.update, data);
  }
  deleteExchange(id: number) {
    return fetchApi.post(api.exchange.delete, { id });
  }
  queryUserExchange(data: { account: string }) {
    return fetchApi.get(api.exchange.queryUserExchange, data);
  }
}

export const ExchangeApi = new ExchangeService();