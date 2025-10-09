
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card } from './Card';
import { MOCK_ALERTS, MOCK_PATCH_JOBS, MOCK_SYSTEM_METRICS } from '../constants';
import { AlertSeverity } from '../types';
import { PatchStatus } from '../types';

const KpiCard: React.FC<{ title: string; value: string; change?: string; changeType?: 'increase' | 'decrease' }> = ({ title, value, change, changeType }) => (
    <Card>
        <h4 className="text-sm font-medium text-highlight">{title}</h4>
        <p className="text-3xl font-bold text-light mt-2">{value}</p>
        {change && (
            <p className={`text-xs mt-1 ${changeType === 'increase' ? 'text-red-500' : 'text-green-500'}`}>
                {change}
            </p>
        )}
    </Card>
);

export const DashboardView: React.FC = () => {
    const activeAlerts = MOCK_ALERTS.filter(a => a.status === 'New').length;
    const criticalAlerts = MOCK_ALERTS.filter(a => a.severity === AlertSeverity.Critical && a.status === 'New').length;
    const patchesCompleted = MOCK_PATCH_JOBS.filter(p => p.status === PatchStatus.Completed).length;
    const downtimeRisk = (criticalAlerts * 10 + (activeAlerts - criticalAlerts) * 2).toFixed(1);

    const alertSeverityData = Object.values(AlertSeverity).map(severity => ({
        name: severity,
        count: MOCK_ALERTS.filter(a => a.severity === severity).length,
    }));
    
    const COLORS = {
        [AlertSeverity.Critical]: '#EF4444',
        [AlertSeverity.High]: '#F97316',
        [AlertSeverity.Medium]: '#EAB308',
        [AlertSeverity.Low]: '#22C55E',
        [AlertSeverity.Info]: '#3B82F6',
    };

    const patchComplianceData = [
        { name: 'Completed', value: patchesCompleted },
        { name: 'Other', value: MOCK_PATCH_JOBS.length - patchesCompleted }
    ];
    const complianceColors = ['#00BFFF', '#415A77'];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Active Alerts" value={activeAlerts.toString()} change="+2 since last hour" changeType="increase" />
                <KpiCard title="Critical Alerts" value={criticalAlerts.toString()} />
                <KpiCard title="Patches Completed (24h)" value={patchesCompleted.toString()} />
                <KpiCard title="AI Predicted Downtime Risk" value={`${downtimeRisk}%`} changeType="increase" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="System Metrics (Last Hour)" className="lg:col-span-2">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={MOCK_SYSTEM_METRICS}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(224, 225, 221, 0.2)" />
                            <XAxis dataKey="time" stroke="#E0E1DD" />
                            <YAxis stroke="#E0E1DD" />
                            <Tooltip contentStyle={{ backgroundColor: '#1B263B', border: 'none' }} />
                            <Legend wrapperStyle={{ color: '#E0E1DD' }} />
                            <Line type="monotone" dataKey="cpu" name="CPU (%)" stroke="#EF4444" strokeWidth={2} />
                            <Line type="monotone" dataKey="memory" name="Memory (%)" stroke="#3B82F6" strokeWidth={2} />
                            <Line type="monotone" dataKey="disk" name="Disk (%)" stroke="#22C55E" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card title="Patch Compliance">
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={patchComplianceData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {patchComplianceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={complianceColors[index % complianceColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1B263B', border: 'none' }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <Card title="Alerts by Severity">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={alertSeverityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(224, 225, 221, 0.2)" />
                        <XAxis dataKey="name" stroke="#E0E1DD" />
                        <YAxis stroke="#E0E1DD" />
                        <Tooltip contentStyle={{ backgroundColor: '#1B263B', border: 'none' }} cursor={{fill: 'rgba(119, 141, 169, 0.2)'}} />
                        <Bar dataKey="count" name="Count" fill="#00BFFF" >
                             {alertSeverityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name as AlertSeverity]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};
