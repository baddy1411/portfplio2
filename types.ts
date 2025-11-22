
export interface Project {
  title: string;
  description: string;
  link: string;
  tech: string[];
  icon: string; // Lucide icon name
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  logo: string; // Domain for logo fetching (e.g., 'google.com')
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
  verificationId?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  isDay: boolean;
}

export interface GithubProfile {
  public_repos: number;
  followers: number;
  avatar_url: string;
  html_url: string;
  login: string;
}

export interface Skill {
  name: string;
  icon: string; // SimpleIcons slug
  description: string;
  category: string;
}
