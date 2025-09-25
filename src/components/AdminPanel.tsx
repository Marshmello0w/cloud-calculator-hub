import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Edit3, 
  Trash2, 
  ArrowLeft,
  Mail,
  Shield,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'admin@los-santos.de',
      isAdmin: true,
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    {
      id: '2',
      email: 'user@los-santos.de',
      isAdmin: false,
      createdAt: '2024-01-16',
      lastLogin: '2024-01-19'
    },
    {
      id: '3',
      email: 'officer@los-santos.de',
      isAdmin: false,
      createdAt: '2024-01-17'
    }
  ]);
  
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);
  const { toast } = useToast();

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUserEmail) {
      toast({
        title: "Fehler",
        description: "E-Mail Adresse ist erforderlich",
        variant: "destructive"
      });
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: newUserEmail,
      isAdmin: newUserIsAdmin,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUser]);
    setNewUserEmail('');
    setNewUserIsAdmin(false);
    setShowCreateUser(false);

    toast({
      title: "Benutzer erstellt",
      description: `${newUser.email} wurde erfolgreich hinzugefügt.`
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "Benutzer gelöscht",
      description: "Der Benutzer wurde erfolgreich entfernt."
    });
  };

  const toggleAdminStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isAdmin: !user.isAdmin }
        : user
    ));
    toast({
      title: "Status geändert",
      description: "Admin-Status wurde aktualisiert."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-penalty-header border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                  <p className="text-sm text-muted-foreground">BENUTZERVERWALTUNG</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowCreateUser(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Neuer Benutzer
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Gesamt Benutzer</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-warning/10 rounded-full">
                  <Shield className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {users.filter(u => u.isAdmin).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Administratoren</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-full">
                  <Calendar className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {users.filter(u => u.lastLogin).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Aktive Benutzer</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Create User Form */}
          {showCreateUser && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Neuen Benutzer erstellen</h3>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail Adresse</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="benutzer@los-santos.de"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminStatus">Benutzerrolle</Label>
                    <select
                      id="adminStatus"
                      value={newUserIsAdmin ? 'admin' : 'user'}
                      onChange={(e) => setNewUserIsAdmin(e.target.value === 'admin')}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                    >
                      <option value="user">Benutzer</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Benutzer erstellen
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateUser(false)}
                  >
                    Abbrechen
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Users Table */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Benutzerliste</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">E-Mail</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Rolle</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Erstellt</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Letzter Login</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{user.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={user.isAdmin ? "default" : "secondary"}
                          className={user.isAdmin ? "bg-primary text-primary-foreground" : ""}
                        >
                          {user.isAdmin ? 'Administrator' : 'Benutzer'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString('de-DE')}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {user.lastLogin 
                          ? new Date(user.lastLogin).toLocaleDateString('de-DE')
                          : 'Nie'
                        }
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleAdminStatus(user.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}