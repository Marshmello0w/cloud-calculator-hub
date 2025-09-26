import { useState, useEffect } from 'react';
import { PenaltyCalculator } from '@/components/PenaltyCalculator';
import { AuthLogin } from '@/components/AuthLogin';
import { AdminPanel } from '@/components/AdminPanel';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserData {
  email: string;
  isAdmin: boolean;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState<'calculator' | 'admin'>('calculator');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check if user is admin based on Discord username or email
          const email = session.user.email || '';
          const username = session.user.user_metadata?.full_name || '';
          const isAdmin = email.includes('admin') || username.toLowerCase().includes('admin');
          
          setUserData({
            email: email,
            isAdmin: isAdmin
          });
        } else {
          setUserData(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const email = session.user.email || '';
        const username = session.user.user_metadata?.full_name || '';
        const isAdmin = email.includes('admin') || username.toLowerCase().includes('admin');
        
        setUserData({
          email: email,
          isAdmin: isAdmin
        });
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (email: string, isAdmin: boolean) => {
    // This is now handled by the auth state listener
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentView('calculator');
  };

  const showAdminPanel = () => {
    setCurrentView('admin');
  };

  const showCalculator = () => {
    setCurrentView('calculator');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !userData) {
    return <AuthLogin onLogin={handleLogin} />;
  }

  if (currentView === 'admin' && userData.isAdmin) {
    return <AdminPanel onBack={showCalculator} />;
  }

  return (
    <PenaltyCalculator
      onLogout={handleLogout}
      userEmail={userData.email}
      isAdmin={userData.isAdmin}
      onShowAdminPanel={userData.isAdmin ? showAdminPanel : undefined}
    />
  );
};

export default Index;
