import { Pagination } from "../../interfaces";

export interface DashboardUpcomingTaskListEntity {
  id: number;
  title: string;
  start_date: string;
  due_date: string;
  status: string;
  priority: string;
  updated_at: string;
}

export type DashboardUpcomingTaskListResponse = Pagination<DashboardUpcomingTaskListEntity>;
