
import type { Alert, PatchJob, SystemMetric } from './types';
import { AlertSeverity, PatchStatus } from './types';

export const MOCK_ALERTS: Alert[] = [
  { id: 'AL-001', timestamp: '2023-10-27 10:45:12', severity: AlertSeverity.Critical, source: 'Server-01', description: 'CPU utilization over 95% for 10 minutes.', status: 'New' },
  { id: 'AL-002', timestamp: '2023-10-27 10:42:30', severity: AlertSeverity.High, source: 'DB-Primary', description: 'Database connection pool exhausted.', status: 'New' },
  { id: 'AL-003', timestamp: '2023-10-27 10:30:05', severity: AlertSeverity.Medium, source: 'WebApp-03', description: 'High response time detected on /api/users.', status: 'Acknowledged' },
  { id: 'AL-004', timestamp: '2023-10-27 10:15:45', severity: AlertSeverity.Low, source: 'Firewall', description: 'Unusual outbound traffic pattern detected.', status: 'Resolved' },
  { id: 'AL-005', timestamp: '2023-10-27 09:50:00', severity: AlertSeverity.Info, source: 'Backup-Svc', description: 'Daily backup completed successfully.', status: 'Resolved' },
  { id: 'AL-006', timestamp: '2023-10-27 09:45:12', severity: AlertSeverity.Critical, source: 'Server-02', description: 'Memory usage critical at 98%.', status: 'New' },
  { id: 'AL-007', timestamp: '2023-10-27 09:30:15', severity: AlertSeverity.High, source: 'API-Gateway', description: '5xx error rate exceeds threshold.', status: 'Acknowledged' },
];

export const MOCK_PATCH_JOBS: PatchJob[] = [
    { id: 'PJ-101', targetSystems: 50, patchName: 'Security Update Q4-2023', status: PatchStatus.Completed, startedAt: '2023-10-26 22:00:00', completedAt: '2023-10-26 23:30:00' },
    { id: 'PJ-102', targetSystems: 120, patchName: 'OS Kernel Patch v5.15.2', status: PatchStatus.InProgress, startedAt: '2023-10-27 10:00:00' },
    { id: 'PJ-103', targetSystems: 15, patchName: 'Java Log4j Mitigation', status: PatchStatus.Failed, startedAt: '2023-10-25 01:00:00', completedAt: '2023-10-25 01:15:00' },
    { id: 'PJ-104', targetSystems: 200, patchName: 'Critical Infrastructure Update', status: PatchStatus.Pending, startedAt: '2023-10-28 02:00:00' },
    { id: 'PJ-105', targetSystems: 35, patchName: 'Database Performance Hotfix', status: PatchStatus.Completed, startedAt: '2023-10-24 14:00:00', completedAt: '2023-10-24 14:25:00' },
];

export const MOCK_SYSTEM_METRICS: SystemMetric[] = [
    { time: '10:00', cpu: 20, memory: 45, disk: 60 },
    { time: '10:05', cpu: 25, memory: 48, disk: 61 },
    { time: '10:10', cpu: 30, memory: 50, disk: 61 },
    { time: '10:15', cpu: 28, memory: 52, disk: 62 },
    { time: '10:20', cpu: 40, memory: 55, disk: 62 },
    { time: '10:25', cpu: 55, memory: 60, disk: 63 },
    { time: '10:30', cpu: 70, memory: 65, disk: 63 },
    { time: '10:35', cpu: 85, memory: 75, disk: 64 },
    { time: '10:40', cpu: 92, memory: 88, disk: 65 },
    { time: '10:45', cpu: 96, memory: 90, disk: 65 },
];
