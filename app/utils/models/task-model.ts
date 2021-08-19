
export interface Tag {
  id?: number;
  name: string;
  createdAt: Date;
}

export interface projectName {
  id?: number;
  name: string;
  createdAt: Date;
}

export interface TaskModel {
  id?: string;
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
