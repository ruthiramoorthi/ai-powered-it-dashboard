
import React from 'react';
import { MOCK_ALERTS } from '../constants';
import { AlertSeverity } from '../types';
import { Card } from './Card';

const severityColorMap: Record<AlertSeverity, string> = {
    [AlertSeverity.Critical]: 'bg-red-500/20 text-red-400 border-red-500',
    [AlertSeverity.High]: 'bg-orange-500/20 text-orange-400 border-orange-500',
    [AlertSeverity.Medium]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
    [AlertSeverity.Low]: 'bg-green-500/20 text-green-400 border-green-500',
    [AlertSeverity.Info]: 'bg-blue-500/20 text-blue-400 border-blue-500',
};

const statusColorMap: Record<string, string> = {
    'New': 'bg-cyan-500/20 text-cyan-400',
    'Acknowledged': 'bg-purple-500/20 text-purple-400',
    'Resolved': 'bg-gray-500/20 text-gray-400',
};


export const AlertsView: React.FC = () => {
  return (
    <Card title="Alerts Management">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-highlight">
          <thead className="text-xs text-light uppercase bg-accent/30">
            <tr>
              <th scope="col" className="px-6 py-3">Severity</th>
              <th scope="col" className="px-6 py-3">Timestamp</th>
              <th scope="col" className="px-6 py-3">Source</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ALERTS.map((alert) => (
              <tr key={alert.id} className="bg-secondary border-b border-accent/50 hover:bg-accent/20">
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full border ${severityColorMap[alert.severity]}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4">{alert.timestamp}</td>
                <td className="px-6 py-4 font-medium">{alert.source}</td>
                <td className="px-6 py-4">{alert.description}</td>
                <td className="px-6 py-4">
                     <span className={`px-2 py-1 text-xs font-semibold rounded-md ${statusColorMap[alert.status]}`}>
                        {alert.status}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex space-x-2">
                         <button className="text-xs font-semibold text-light bg-accent hover:bg-highlight/80 py-1 px-3 rounded-md transition-colors">Ack</button>
                         <button className="text-xs font-semibold text-light bg-green-600 hover:bg-green-700 py-1 px-3 rounded-md transition-colors">Resolve</button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
