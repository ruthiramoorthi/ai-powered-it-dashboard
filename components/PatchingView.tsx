
import React from 'react';
import { MOCK_PATCH_JOBS } from '../constants';
import { PatchStatus } from '../types';
import { Card } from './Card';

const statusColorMap: Record<PatchStatus, string> = {
    [PatchStatus.Completed]: 'bg-green-500/20 text-green-400',
    [PatchStatus.InProgress]: 'bg-blue-500/20 text-blue-400 animate-pulse',
    [PatchStatus.Pending]: 'bg-yellow-500/20 text-yellow-400',
    [PatchStatus.Failed]: 'bg-red-500/20 text-red-400',
};

export const PatchingView: React.FC = () => {
    return (
        <Card title="Patch Automation">
             <div className="flex justify-end mb-4">
                <button className="bg-cyan-accent hover:bg-cyan-accent/80 text-primary font-bold py-2 px-4 rounded-lg transition-colors">
                    Deploy New Patch
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-highlight">
                    <thead className="text-xs text-light uppercase bg-accent/30">
                        <tr>
                            <th scope="col" className="px-6 py-3">Job ID</th>
                            <th scope="col" className="px-6 py-3">Patch Name</th>
                            <th scope="col" className="px-6 py-3">Target Systems</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Started At</th>
                            <th scope="col" className="px-6 py-3">Completed At</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_PATCH_JOBS.map((job) => (
                            <tr key={job.id} className="bg-secondary border-b border-accent/50 hover:bg-accent/20">
                                <td className="px-6 py-4 font-mono text-cyan-400">{job.id}</td>
                                <td className="px-6 py-4 font-medium text-light">{job.patchName}</td>
                                <td className="px-6 py-4">{job.targetSystems}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-md ${statusColorMap[job.status]}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{job.startedAt}</td>
                                <td className="px-6 py-4">{job.completedAt || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    <button className="text-xs font-semibold text-light bg-accent hover:bg-highlight/80 py-1 px-3 rounded-md transition-colors">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
