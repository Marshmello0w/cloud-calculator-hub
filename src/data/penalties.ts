export interface Penalty {
  id: string;
  section: string;
  title: string;
  description: string;
  category: 'StGB' | 'StVO' | 'BtMG' | 'WaffG' | 'ExGBG' | 'BGL' | 'VG' | 'OWiG' | 'AG' | 'TSchG';
  fineMin: number;
  fineMax: number;
  jailTimeMin: number; // in minutes
  jailTimeMax: number; // in minutes
}

export const penalties: Penalty[] = [
  {
    id: '1',
    section: '§1',
    title: 'Menschenwürde - Missachtung',
    description: 'Wer die Würde eines anderen absichtlich verletzt - sei es durch Worte, Taten oder digitale Inhalte - macht sich der Missachtung der Menschenwürde schuldig. Dies umfasst insbesondere entwürdigende, diskriminierende, rassistische, sexistische oder menschenverachtende Verhaltensweisen und fällt besonders schwer ins Gewicht, wenn die Handlung öffentlich erfolgt oder wiederholt wird.',
    category: 'StGB',
    fineMin: 5000,
    fineMax: 10000,
    jailTimeMin: 20,
    jailTimeMax: 60
  },
  {
    id: '2',
    section: '§2',
    title: 'Körperverletzung',
    description: 'Wer einer anderen Person körperlichen Schaden zufügt - sei es durch Schläge, Tritte, Waffengewalt oder andere körperliche Angriffe - macht sich der Körperverletzung schuldig. Die Schwere der Strafe richtet sich nach Ausmaß der Verletzung, den eingesetzten Mitteln sowie dem Motiv der Tat.',
    category: 'StGB',
    fineMin: 3000,
    fineMax: 8000,
    jailTimeMin: 15,
    jailTimeMax: 50
  },
  {
    id: '3',
    section: '§3',
    title: 'Diskriminierung',
    description: 'Wer eine Person aufgrund von Herkunft, Hautfarbe, Geschlecht, Religion, sexueller Orientierung oder anderer persönlicher Merkmale benachteiligt, beleidigt oder herabwürdigt, macht sich der Diskriminierung schuldig. Dies gilt für verbale, schriftliche sowie digitale Äußerungen und Handlungen.',
    category: 'StGB',
    fineMin: 1500,
    fineMax: 5000,
    jailTimeMin: 10,
    jailTimeMax: 30
  },
  {
    id: '4',
    section: '§4',
    title: 'Pressebehinderung',
    description: 'Wer Journalist:innen oder Pressevertreter:innen an ihrer freien Berichterstattung hindert - sei es durch Drohungen, Einschüchterung, Gewalt, Blockieren von Aufnahmen oder Einschränkung der Bewegungsfreiheit - macht sich der Pressebehinderung schuldig. Dies gilt sowohl gegenüber anerkannten Medienvertreter:innen als auch freien Reporter:innen.',
    category: 'StGB',
    fineMin: 2000,
    fineMax: 6000,
    jailTimeMin: 10,
    jailTimeMax: 20
  },
  {
    id: '5',
    section: '§5',
    title: 'Zwangsarbeit, Lizenzverweige rung',
    description: 'Wer eine andere Person zu Arbeiten zwingen will, ohne dass diese dem zugestimmt hat, oder wer rechtmäßig erworbene Lizenzen oder Berechtigungen ohne triftigen Grund verweigert oder entzieht, macht sich der Zwangsarbeit bzw. Lizenzverweigerung schuldig.',
    category: 'StGB',
    fineMin: 4000,
    fineMax: 7000,
    jailTimeMin: 15,
    jailTimeMax: 45
  },
  {
    id: '6',
    section: '§6',
    title: 'Nötigung',
    description: 'Wer eine andere Person rechtswidrig mit Gewalt oder durch Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung nötigt, wird bestraft. Dies umfasst sowohl körperliche als auch psychische Gewalt sowie wirtschaftliche Drohungen.',
    category: 'StGB',
    fineMin: 2500,
    fineMax: 6500,
    jailTimeMin: 10,
    jailTimeMax: 40
  },
  {
    id: '7',
    section: '§7',
    title: 'Erpressung',
    description: 'Wer eine andere Person rechtswidrig mit Gewalt oder durch Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung nötigt und dadurch dem Vermögen des Genötigten oder eines anderen Nachteil zufügt, um sich oder einen Dritten zu Unrecht zu bereichern.',
    category: 'StGB',
    fineMin: 5000,
    fineMax: 12000,
    jailTimeMin: 25,
    jailTimeMax: 80
  },
  {
    id: '8',
    section: '§8',
    title: 'Diebstahl',
    description: 'Wer eine fremde bewegliche Sache einem anderen in der Absicht wegnimmt, die Sache sich oder einem Dritten rechtswidrig zuzueignen, wird wegen Diebstahls bestraft. Dies umfasst auch den Diebstahl geringwertiger Sachen.',
    category: 'StGB',
    fineMin: 1000,
    fineMax: 4000,
    jailTimeMin: 5,
    jailTimeMax: 25
  },
  {
    id: '9',
    section: '§9',
    title: 'Raub',
    description: 'Wer mit Gewalt gegen eine Person oder unter Anwendung von Drohungen mit gegenwärtiger Gefahr für Leib oder Leben eine fremde bewegliche Sache einem anderen in der Absicht wegnimmt, die Sache sich oder einem Dritten rechtswidrig zuzueignen.',
    category: 'StGB',
    fineMin: 8000,
    fineMax: 15000,
    jailTimeMin: 40,
    jailTimeMax: 120
  },
  {
    id: '10',
    section: '§10',
    title: 'Betrug',
    description: 'Wer in der Absicht, sich oder einem Dritten einen rechtswidrigen Vermögensvorteil zu verschaffen, das Vermögen eines anderen dadurch beschädigt, dass er durch Vorspiegelung falscher oder durch Entstellung oder Unterdrückung wahrer Tatsachen einen Irrtum erregt oder unterhält.',
    category: 'StGB',
    fineMin: 3000,
    fineMax: 9000,
    jailTimeMin: 15,
    jailTimeMax: 60
  },
  // StVO Verkehrsdelikte
  {
    id: '11',
    section: '§11',
    title: 'Geschwindigkeitsübertretung',
    description: 'Überschreitung der zulässigen Höchstgeschwindigkeit innerorts oder außerorts. Die Strafe richtet sich nach der Höhe der Überschreitung und dem Gefährdungspotential.',
    category: 'StVO',
    fineMin: 500,
    fineMax: 2000,
    jailTimeMin: 0,
    jailTimeMax: 10
  },
  {
    id: '12',
    section: '§12',
    title: 'Fahren ohne Führerschein',
    description: 'Wer ein Kraftfahrzeug führt, ohne die dafür erforderliche Fahrerlaubnis zu besitzen oder wer trotz Entziehung der Fahrerlaubnis oder trotz eines Fahrverbots ein Kraftfahrzeug führt.',
    category: 'StVO',
    fineMin: 2000,
    fineMax: 5000,
    jailTimeMin: 10,
    jailTimeMax: 30
  },
  // BtMG Betäubungsmitteldelikte
  {
    id: '13',
    section: '§13',
    title: 'Besitz von Betäubungsmitteln',
    description: 'Wer Betäubungsmittel ohne Erlaubnis besitzt, erwirbt, sich auf andere Weise verschafft oder einem anderen überlässt, macht sich strafbar. Die Strafe richtet sich nach Art und Menge der Betäubungsmittel.',
    category: 'BtMG',
    fineMin: 2000,
    fineMax: 8000,
    jailTimeMin: 15,
    jailTimeMax: 60
  },
  {
    id: '14',
    section: '§14',
    title: 'Handel mit Betäubungsmitteln',
    description: 'Wer Betäubungsmittel ohne Erlaubnis verkauft, abgibt, sonst in den Verkehr bringt, erwirbt oder sich auf andere Weise verschafft, um sie in den Verkehr zu bringen, macht sich des unerlaubten Handels schuldig.',
    category: 'BtMG',
    fineMin: 8000,
    fineMax: 20000,
    jailTimeMin: 60,
    jailTimeMax: 180
  }
];

export const categories = [
  { id: 'Alle', name: 'Alle', color: 'penalty-category-active' },
  { id: 'StGB', name: 'StGB', color: 'penalty-category' },
  { id: 'StVO', name: 'StVO', color: 'penalty-category' },
  { id: 'BtMG', name: 'BtMG', color: 'penalty-category' },
  { id: 'WaffG', name: 'WaffG', color: 'penalty-category' },
  { id: 'ExGBG', name: 'ExGBG', color: 'penalty-category' },
  { id: 'BGL', name: 'BGL', color: 'penalty-category' },
  { id: 'VG', name: 'LVG', color: 'penalty-category' },
  { id: 'OWiG', name: 'OWiG', color: 'penalty-category' },
  { id: 'AG', name: 'AG', color: 'penalty-category' },
  { id: 'TSchG', name: 'TSchG', color: 'penalty-category' }
];