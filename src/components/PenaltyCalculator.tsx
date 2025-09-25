import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Scale, Users, LogOut } from 'lucide-react';
import { penalties, categories, type Penalty } from '@/data/penalties';
import { cn } from '@/lib/utils';

interface PenaltyCalculatorProps {
  onLogout?: () => void;  
  userEmail?: string;
  isAdmin?: boolean;
  onShowAdminPanel?: () => void;
}

export function PenaltyCalculator({ onLogout, userEmail, isAdmin, onShowAdminPanel }: PenaltyCalculatorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedPenalties, setSelectedPenalties] = useState<string[]>([]);
  const [fineMultiplier, setFineMultiplier] = useState(100);
  const [jailMultiplier, setJailMultiplier] = useState(100);

  const filteredPenalties = useMemo(() => {
    return penalties.filter(penalty => {
      const matchesSearch = penalty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          penalty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          penalty.section.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Alle' || penalty.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const selectedPenaltyObjects = useMemo(() => {
    return penalties.filter(penalty => selectedPenalties.includes(penalty.id));
  }, [selectedPenalties]);

  const totalFine = useMemo(() => {
    return selectedPenaltyObjects.reduce((total, penalty) => {
      return total + (penalty.fineMax * (fineMultiplier / 100));
    }, 0);
  }, [selectedPenaltyObjects, fineMultiplier]);

  const totalJailTime = useMemo(() => {
    return selectedPenaltyObjects.reduce((total, penalty) => {
      return total + (penalty.jailTimeMax * (jailMultiplier / 100));
    }, 0);
  }, [selectedPenaltyObjects, jailMultiplier]);

  const handlePenaltyToggle = (penaltyId: string) => {
    setSelectedPenalties(prev => 
      prev.includes(penaltyId) 
        ? prev.filter(id => id !== penaltyId)
        : [...prev, penaltyId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-penalty-header border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Strafgesetzbuch Los Santos</h1>
                <p className="text-sm text-muted-foreground">PROFESSIONELLE STRAFENBERECHNUNG</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {userEmail && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Eingeloggt als:</span>
                  <span className="text-sm font-medium text-foreground">{userEmail}</span>
                  {isAdmin && (
                    <Badge variant="default" className="bg-primary text-primary-foreground">Admin</Badge>
                  )}
                </div>
              )}
              {isAdmin && onShowAdminPanel && (
                <Button variant="outline" size="sm" onClick={onShowAdminPanel}>
                  <Users className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              )}
              {onLogout && (
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Search and Laws */}
          <div className="xl:col-span-2 space-y-6">
            {/* Search */}
            <Card className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nach Paragraphen oder Straftaten suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-penalty-search border-border"
                />
              </div>
            </Card>

            {/* Category Filter */}
            <Card className="p-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "transition-all duration-200",
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-penalty-category hover:text-primary-foreground"
                    )}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Penalties List */}
            <div className="space-y-4">
              {filteredPenalties.map((penalty) => (
                <Card key={penalty.id} className="p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedPenalties.includes(penalty.id)}
                      onCheckedChange={() => handlePenaltyToggle(penalty.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">
                            {penalty.section} - {penalty.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {penalty.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-muted-foreground">GELDSTRAFE</span>
                          <p className="font-semibold text-penalty-fine">
                            ${penalty.fineMin.toLocaleString()} - ${penalty.fineMax.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">HAFTZEIT</span>
                          <p className="font-semibold text-penalty-time">
                            {penalty.jailTimeMin} - {penalty.jailTimeMax} Min
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {penalty.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Calculator */}
          <div className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h2 className="text-xl font-bold text-primary mb-6">STRAFENRECHNER</h2>
              
              {selectedPenalties.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Keine Strafen ausgewählt
                </p>
              ) : (
                <div className="space-y-6">
                  {/* Multiplier Controls */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Geldstrafe Anpassung: {fineMultiplier}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={fineMultiplier}
                        onChange={(e) => setFineMultiplier(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Haftstrafe Anpassung: {jailMultiplier}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={jailMultiplier}
                        onChange={(e) => setJailMultiplier(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>

                  {/* Base Values */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                    <div>
                      <span className="text-sm text-muted-foreground">Basis Geldstrafe:</span>
                      <p className="font-bold text-lg">$0</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Basis Haftzeit:</span>
                      <p className="font-bold text-lg">0 Min</p>
                    </div>
                  </div>

                  {/* Total Values */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-2">Gesamt Geldstrafe:</h3>
                      <p className="text-3xl font-bold text-penalty-fine">${totalFine.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-2">Gesamt Haftzeit:</h3>
                      <p className="text-3xl font-bold text-penalty-time">{Math.round(totalJailTime)} Min</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}