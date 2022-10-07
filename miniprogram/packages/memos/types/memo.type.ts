export interface Memo {
  id: number;
  content: string;
  createdTs: string;
  rowStatus: RowStatus;
  formatContent: string;

  time?: string;
}


export enum Visibility {
  PUBLIC = "PUBLIC",
  PROTECTED= "PROTECTED",
  PRIVATE = "PRIVATE"
}

export enum RowStatus {
  ARCHIVED = "ARCHIVED"
}