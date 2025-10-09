
export type Page = 'Dashboard' | 'Alerts' | 'Patching' | 'Analytics';

export enum AlertSeverity {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
  Info = 'Info',
}

export interface Alert {
  id: string;
  timestamp: string;
  severity: AlertSeverity;
  source: string;
  description: string;
  status: 'New' | 'Acknowledged' | 'Resolved';
}

export enum PatchStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Failed = 'Failed'
}

export interface PatchJob {
    id: string;
    targetSystems: number;
    patchName: string;
    status: PatchStatus;
    startedAt: string;
    completedAt?: string;
}

export interface SystemMetric {
    time: string;
    cpu: number;
    memory: number;
    disk: number;
}
