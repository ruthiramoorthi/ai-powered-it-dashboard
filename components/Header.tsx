
import React from 'react';
import { AssistantIcon, UserIcon } from './Icon';

interface HeaderProps {
    onAssistantClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAssistantClick }) => {
  return (
    <header className="bg-secondary p-4 flex justify-between items-center shadow-md flex-shrink-0">
      <h2 className="text-xl font-semibold text-light">Welcome, Admin</h2>
      <div className="flex items-center space-x-4">
        <button
            onClick={onAssistantClick}
            className="p-2 rounded-full bg-accent hover:bg-cyan-accent/80 text-light transition-colors duration-200 flex items-center"
        >
          <AssistantIcon className="w-6 h-6" />
          <span className="hidden sm:inline ml-2 text-sm font-semibold">Smart Assistant</span>
        </button>
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-light"/>
        </div>
      </div>
    </header>
  );
};
