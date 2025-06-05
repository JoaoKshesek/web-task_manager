interface StatusResponse {
  status: string;
  total: number;
}

export interface DashboardStatsResponse {
  stats: StatusResponse[];
}
