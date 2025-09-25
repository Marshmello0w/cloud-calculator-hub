import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Scale, Mail, Lock, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthLoginProps {
  onLogin: (email: string, isAdmin: boolean) => void;
}

export function AuthLogin({ onLogin }: AuthLoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate authentication - in real app this would use Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock admin detection
      const isAdmin = email.includes('admin');
      
      onLogin(email, isAdmin);
      
      toast({
        title: isLogin ? "Anmeldung erfolgreich" : "Registrierung erfolgreich",
        description: `Willkommen ${isAdmin ? 'Admin' : 'Benutzer'}!`
      });
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
            {isLogin ? 'Melden Sie sich an' : 'Erstellen Sie ein Konto'}
          </p>
        </div>

        {/* Login/Register Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-Mail Adresse
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ihre.email@beispiel.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Passwort
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {isLogin ? 'Anmelden...' : 'Registrieren...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isLogin ? <Mail className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  {isLogin ? 'Anmelden' : 'Registrieren'}
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? 'Noch kein Konto? ' : 'Bereits ein Konto? '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                {isLogin ? 'Registrieren' : 'Anmelden'}
              </button>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-2">Demo Konten:</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><strong>Admin:</strong> admin@los-santos.de</p>
              <p><strong>Benutzer:</strong> user@los-santos.de</p>
              <p><em>Beliebiges Passwort verwenden</em></p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}