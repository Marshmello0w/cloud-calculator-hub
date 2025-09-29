import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Edit3, 
  Trash2, 
  ArrowLeft,
  Mail,
  Shield,
  Calendar,
  Settings,
  Database,
  FileText,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin?: string;
  password: string;
}

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'admin@los-santos.de',
      password: 'admin123',
      isAdmin: true,
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20'
    }
  ]);
  
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);
  const { toast } = useToast();

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUserEmail || !newUserPassword) {
      toast({
        title: "Fehler",
        description: "E-Mail und Passwort sind erforderlich",
        variant: "destructive"
      });
      return;
    }

    if (users.some(user => user.email === newUserEmail)) {
      toast({
        title: "Fehler",
        description: "Ein Benutzer mit dieser E-Mail existiert bereits",
        variant: "destructive"
      });
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: newUserEmail,
      password: newUserPassword,
      isAdmin: newUserIsAdmin,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUser]);
    setNewUserEmail('');
    setNewUserPassword('');
    setNewUserIsAdmin(false);
    setShowCreateUser(false);

    toast({
      title: "Benutzer erstellt",
      description: `${newUser.email} wurde erfolgreich hinzugefügt.`
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (users.find(u => u.id === userId)?.email === 'admin@los-santos.de') {
      toast({
        title: "Fehler",
        description: "Der Haupt-Administrator kann nicht gelöscht werden",
        variant: "destructive"
      });
      return;
    }

    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "Benutzer gelöscht",
      description: "Der Benutzer wurde erfolgreich entfernt."
    });
  };

  const toggleAdminStatus = (userId: string) => {
    if (users.find(u => u.id === userId)?.email === 'admin@los-santos.de') {
      toast({
        title: "Fehler",
        description: "Der Status des Haupt-Administrators kann nicht geändert werden",
        variant: "destructive"
      });
      return;
    }

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

  const resetPassword = (userId: string) => {
    const newPassword = `temp${Math.random().toString(36).substring(7)}`;
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, password: newPassword }
        : user
    ));
    toast({
      title: "Passwort zurückgesetzt",
      description: `Neues Passwort: ${newPassword}`
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
                <Settings className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                  <p className="text-sm text-muted-foreground">SYSTEMVERWALTUNG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Benutzer
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistiken
              </TabsTrigger>
              <TabsTrigger value="laws" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Gesetze
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                System
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
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

              {/* Create User Button */}
              <div className="flex justify-end">
                <Button 
                  onClick={() => setShowCreateUser(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Neuer Benutzer
                </Button>
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
                        <Label htmlFor="password">Passwort</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                          placeholder="Passwort eingeben"
                          required
                        />
                      </div>
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
                        <th className="text-left py-3 px-4 font-medium text-foreground">Passwort</th>
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
                            <code className="text-sm bg-muted px-2 py-1 rounded text-foreground">
                              {user.password}
                            </code>
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
                                onClick={() => resetPassword(user.id)}
                                title="Passwort zurücksetzen"
                              >
                                🔑
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleAdminStatus(user.id)}
                                title="Admin-Status ändern"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteUser(user.id)}
                                title="Benutzer löschen"
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
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="statistics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Benutzer Aktivität</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Heute angemeldet:</span>
                      <span className="font-medium text-foreground">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diese Woche:</span>
                      <span className="font-medium text-foreground">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diesen Monat:</span>
                      <span className="font-medium text-foreground">1</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Server Status:</span>
                      <Badge variant="default" className="bg-success text-success-foreground">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Datenbank:</span>
                      <Badge variant="default" className="bg-success text-success-foreground">Aktiv</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Letzte Sicherung:</span>
                      <span className="font-medium text-foreground">Heute</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Laws Tab */}
            <TabsContent value="laws" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Gesetzesdatenbank</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gesetze geladen:</span>
                    <span className="font-medium text-foreground">154 Paragraphen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kategorien:</span>
                    <span className="font-medium text-foreground">10 (StGB, StVG, WaffG, etc.)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Letzte Aktualisierung:</span>
                    <span className="font-medium text-foreground">Heute</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Einstellungen</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Datenbank Sicherung erstellen
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    System Logs anzeigen
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Konfiguration bearbeiten
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}