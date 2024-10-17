import api from "../api";
import fetchApi from "../base/fetchApi";

class PositionService {
  getPositionList(data: { account?: string }) {
    return fetchApi.get(api.position.list, data);
  }
}

export const PositionApi = new PositionService();