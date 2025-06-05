interface Body {
  title: string;
  start_date: Date;
  due_date: Date;
  priority: string;
  status: string;
  description: string;
}

export interface TaskUpdateRequest {
  taskId: number;
  body: Body;
}
