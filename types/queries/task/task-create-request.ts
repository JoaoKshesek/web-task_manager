export interface TaskCreateRequest {
  title: string;
  start_date: Date;
  due_date: Date;
  priority: string;
  status: string;
  description: string;
}
