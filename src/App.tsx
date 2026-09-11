import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroDemoModal } from './components/HeroDemoModal';
import { RoleSelectorModal } from './components/RoleSelectorModal';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ListSurplusPage } from './pages/ListSurplusPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { MaterialDetailsPage } from './pages/MaterialDetailsPage';
import { MyMaterialsPage } from './pages/MyMaterialsPage';
import { MyRequestsPage } from './pages/MyRequestsPage';
import { ImpactDashboardPage } from './pages/ImpactDashboardPage';
import { BusinessDashboardPage } from './pages/BusinessDashboardPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'list-surplus':
        return <ListSurplusPage />;
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'material-details':
        return <MaterialDetailsPage />;
      case 'my-materials':
        return <MyMaterialsPage />;
      case 'my-requests':
        return <MyRequestsPage />;
      case 'impact':
        return <ImpactDashboardPage />;
      case 'business-dashboard':
        return <BusinessDashboardPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sustain-sand text-sustain-darkText font-sans">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {renderPage()}
      </main>
      <Footer />
      <HeroDemoModal />
      <RoleSelectorModal />
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
