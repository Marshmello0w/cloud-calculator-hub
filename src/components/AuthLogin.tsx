import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scale } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AuthLoginProps {
  onLogin: (email: string, isAdmin: boolean) => void;
}

export function AuthLogin({ onLogin }: AuthLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password
        });
      }

      const { error } = result;

      if (error) {
        toast({
          title: "Fehler",
          description: error.message,
          variant: "destructive"
        });
      } else if (isSignUp) {
        toast({
          title: "Registrierung erfolgreich",
          description: "Bitte überprüfen Sie Ihre E-Mail für die Bestätigung.",
        });
      }
    } catch (error) {
      toast({
        title: "Fehler", 
        description: "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Scale className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Strafgesetzbuch Los Santos
          </h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp ? 'Neues Konto erstellen' : 'Bei Ihrem Konto anmelden'}
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-8">
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ihre-email@beispiel.de"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ihr Passwort"
              />
            </div>

            <Button 
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignUp ? 'Registrieren...' : 'Anmelden...'}
                </div>
              ) : (
                isSignUp ? 'Registrieren' : 'Anmelden'
              )}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isSignUp 
                  ? 'Bereits ein Konto? Hier anmelden' 
                  : 'Noch kein Konto? Hier registrieren'
                }
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}