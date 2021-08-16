
export interface TaskModel {
  name: string;
  description: string;
  projectName: string;
  priority: number;
  tag: string[];
  startAt: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
