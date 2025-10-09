
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AlertsView } from './components/AlertsView';
import { PatchingView } from './components/PatchingView';
import { SmartAssistant } from './components/SmartAssistant';
import type { Page } from './types';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [isAssistantOpen, setAssistantOpen] = useState(false);

  const renderContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Alerts':
        return <AlertsView />;
      case 'Patching':
        return <PatchingView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-primary font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onAssistantClick={() => setAssistantOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-primary p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
       <SmartAssistant isOpen={isAssistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
};

export default App;
