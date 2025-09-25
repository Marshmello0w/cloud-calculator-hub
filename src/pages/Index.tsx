import { useState } from 'react';
import { PenaltyCalculator } from '@/components/PenaltyCalculator';
import { AuthLogin } from '@/components/AuthLogin';
import { AdminPanel } from '@/components/AdminPanel';

interface User {
  email: string;
  isAdmin: boolean;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'calculator' | 'admin'>('calculator');

  const handleLogin = (email: string, isAdmin: boolean) => {
    setUser({ email, isAdmin });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('calculator');
  };

  const showAdminPanel = () => {
    setCurrentView('admin');
  };

  const showCalculator = () => {
    setCurrentView('calculator');
  };

  if (!user) {
    return <AuthLogin onLogin={handleLogin} />;
  }

  if (currentView === 'admin' && user.isAdmin) {
    return <AdminPanel onBack={showCalculator} />;
  }

  return (
    <PenaltyCalculator
      onLogout={handleLogout}
      userEmail={user.email}
      isAdmin={user.isAdmin}
      onShowAdminPanel={user.isAdmin ? showAdminPanel : undefined}
    />
  );
};

export default Index;
