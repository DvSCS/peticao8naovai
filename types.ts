export enum ClassRoom {
  CLASS_9U = '9º Ano Único'
}

export interface Signature {
  id: string;
  name: string;
  classRoom: ClassRoom;
  reason: string;
  timestamp: number;
  isAnonymous: boolean;
}

export interface SummaryResult {
  summary: string;
  sentiment: string;
}