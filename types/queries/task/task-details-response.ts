export interface TaskDetailsResponse {
  id: number;
  title: string;
  start_date_original: Date;
  start_date_formatted: string;
  due_date_original: Date;
  due_date_formatted: string;
  priority: string;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
}
