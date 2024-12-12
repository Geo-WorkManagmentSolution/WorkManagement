import React from 'react';
import { ProjectStatus } from '../ProjectApi';

interface ProjectStatusProps {
  status: ProjectStatus;
}

const statusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.Upcoming]: 'bg-blue-400 text-white',
  [ProjectStatus.Ongoing]: 'bg-green-500 text-white',
  [ProjectStatus.Completed]: 'bg-purple-500 text-white',
  [ProjectStatus.OnHold]: 'bg-yellow-500 text-black',
  [ProjectStatus.Closed]: 'bg-gray-500 text-white',
};

export function ProjectStatusComponent({ status }: ProjectStatusProps) {
  return (
    <span className={`inline text-lg font-semibold text-white py-4 px-24 rounded-full truncate ${statusColors[status]}`}>
      {status}
    </span>
  );
}

