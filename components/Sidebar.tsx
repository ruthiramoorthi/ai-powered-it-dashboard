
import React from 'react';
import type { Page } from '../types';
import { DashboardIcon, AlertIcon, PatchingIcon } from './Icon';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: Page;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li
    className={`flex items-center p-3 my-2 cursor-pointer rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-cyan-accent/20 text-cyan-accent'
        : 'text-highlight hover:bg-accent/50 hover:text-light'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-4 font-semibold text-sm">{label}</span>
  </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <aside className="w-64 bg-secondary flex-shrink-0 p-4 hidden md:block">
      <div className="flex items-center mb-10">
        <PatchingIcon className="w-10 h-10 text-cyan-accent" />
        <h1 className="text-xl font-bold ml-2 text-light">IT Automate AI</h1>
      </div>
      <nav>
        <ul>
          <NavItem
            icon={<DashboardIcon className="w-6 h-6" />}
            label="Dashboard"
            isActive={currentPage === 'Dashboard'}
            onClick={() => setCurrentPage('Dashboard')}
          />
          <NavItem
            icon={<AlertIcon className="w-6 h-6" />}
            label="Alerts"
            isActive={currentPage === 'Alerts'}
            onClick={() => setCurrentPage('Alerts')}
          />
          <NavItem
            icon={<PatchingIcon className="w-6 h-6" />}
            label="Patching"
            isActive={currentPage === 'Patching'}
            onClick={() => setCurrentPage('Patching')}
          />
        </ul>
      </nav>
    </aside>
  );
};
