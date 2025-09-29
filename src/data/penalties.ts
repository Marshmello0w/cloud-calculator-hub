// Import laws from the laws.js file
import { laws } from './laws.js';

export interface Penalty {
  id: string;
  section: string;
  title: string;
  description: string;
  category: string;
  fineMin: number;
  fineMax: number;
  jailTimeMin: number; // in minutes
  jailTimeMax: number; // in minutes
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

// Transform the laws data to match the expected interface
export const penalties: Penalty[] = laws.map((law, index) => ({
  id: (index + 1).toString(),
  section: law.id,
  title: law.title,
  description: law.description,
  category: law.category,
  fineMin: law.fineMin,
  fineMax: law.fineMax,
  jailTimeMin: law.jailMin,
  jailTimeMax: law.jailMax
}));

// Extract unique categories from laws
const uniqueCategories = [...new Set(laws.map(law => law.category))].sort();

export const categories: Category[] = [
  { id: 'Alle', name: 'Alle', color: 'penalty-category-active' },
  ...uniqueCategories.map((cat: string) => ({
    id: cat,
    name: cat,
    color: 'penalty-category'
  } as Category))
];

// Helper functions for searching and filtering
export const searchPenalties = (query: string, category?: string): Penalty[] => {
  const normalizedQuery = query.toLowerCase();
  
  return penalties.filter(penalty => {
    const matchesCategory = !category || category === 'Alle' || penalty.category === category;
    const matchesQuery = 
      penalty.title.toLowerCase().includes(normalizedQuery) ||
      penalty.section.toLowerCase().includes(normalizedQuery) ||
      penalty.description.toLowerCase().includes(normalizedQuery);
    
    return matchesCategory && matchesQuery;
  });
};

export const getPenaltyById = (id: string): Penalty | undefined => {
  return penalties.find(p => p.id === id);
};