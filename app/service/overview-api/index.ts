import api from "../api";
import fetchApi from "../base/fetchApi";

class OverviewService {
  getTotalSummary() {
    return fetchApi.get(api.overview.getTotalSummary, {});
  }
  getTotalList() {
    return fetchApi.get(api.overview.getTotalList, {});
  }
}

export const OverviewApi = new OverviewService();