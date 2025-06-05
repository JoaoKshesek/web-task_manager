import { Pagination } from "../../interfaces";

export interface TaskListEntity {
  id: number;
  title: string;
  start_date: string;
  due_date: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

export type TaskListResponse = Pagination<TaskListEntity>;
