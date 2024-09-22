import fetchApi from '../base/fetchApi';
import mock from './mock';
import api from '../api'
import { IGetDividendRecordListParams, TAddDividendRecordData } from './type';

class DividendRecordService {
  getDividendRecordList(data: IGetDividendRecordListParams) {
    return fetchApi.get(api.bonus.list, data);
  }
  addDividendRecord(data: TAddDividendRecordData) {
    return fetchApi.post(api.bonus.add, data);
  }
}

export const DividendRecordApi = new DividendRecordService();