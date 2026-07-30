export interface ExpertiseItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  fullDetails: string;
  highlights: string[];
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  role: string;
  summary: string;
  keyAchievements: string[];
  skillsUsed: string[];
  isCurrent?: boolean;
}

export interface InvestmentItem {
  id: string;
  name: string;
  category: 'Fintech' | 'AI/ML' | 'SaaS' | 'Infrastructure' | 'Cybersecurity';
  stage: string;
  tagline: string;
  description: string;
  icon: string;
  metrics: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  deliverables: string[];
  idealFor: string;
}

export interface TechStackItem {
  name: string;
  category: 'Mobile' | 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud';
  icon: string;
  experience: string;
  useCase: string;
}

export interface BelvoMetrics {
  apiRequests: string;
  capitalRaised: string;
  activeAccounts: string;
  uptime: string;
  latencyMs: number;
  activeRegions: number;
}

export interface BelvoServiceItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}
