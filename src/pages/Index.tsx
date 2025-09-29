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
    console.log('[Index] mounted');
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[Index] onAuthStateChange', { event, user: session?.user?.email });
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
        
        // Normalize OAuth hash for HashRouter after Supabase processed it
        if (window.location.hash && (/access_token=|refresh_token=|error=/.test(window.location.hash))) {
          const cleanUrl = `${window.location.pathname}${window.location.search}#/`;
          window.history.replaceState(null, '', cleanUrl);
          console.log('[Index] OAuth hash normalized to', cleanUrl);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        console.log('[Index] getSession', { hasSession: !!session, user: session?.user?.email });
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
        
        // Normalize OAuth hash for HashRouter on initial load too
        if (window.location.hash && (/access_token=|refresh_token=|error=/.test(window.location.hash))) {
          const cleanUrl = `${window.location.pathname}${window.location.search}#/`;
          window.history.replaceState(null, '', cleanUrl);
          console.log('[Index] OAuth hash normalized on initial load to', cleanUrl);
        }
        
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('[Index] getSession error', e);
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
    console.log('[Index] Rendering loading spinner');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !userData) {
    console.log('[Index] Rendering AuthLogin', { user: !!user, userData: !!userData });
    return <AuthLogin onLogin={handleLogin} />;
  }

  if (currentView === 'admin' && userData.isAdmin) {
    console.log('[Index] Rendering AdminPanel');
    return <AdminPanel onBack={showCalculator} />;
  }

  console.log('[Index] Rendering PenaltyCalculator', { isAdmin: userData.isAdmin });
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
