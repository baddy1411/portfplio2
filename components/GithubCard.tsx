
import React, { useEffect, useState } from 'react';
import { Github, Star, GitCommit, ArrowUpRight } from 'lucide-react';
import { fetchGithubProfile } from '../services/openSourceApis';
import { GithubProfile } from '../types';

export const GithubCard: React.FC<{ username: string }> = ({ username }) => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGithubProfile(username)
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return null;

  // Fallback/Generic State if API fails or user not found
  if (!profile) {
    return (
        <a 
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/30 hover:bg-white dark:hover:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all mb-8 backdrop-blur-sm"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:scale-105 transition-transform">
               <Github size={24} className="text-neutral-600 dark:text-neutral-300" />
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
              GitHub Projects
            </h4>
            <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
              <span>View source code and contributions</span>
            </div>
          </div>

          <ArrowUpRight size={16} className="text-neutral-600 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
        </a>
    );
  }

  return (
    <a 
      href={profile.html_url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex items-center gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/30 hover:bg-white dark:hover:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all mb-8 backdrop-blur-sm"
    >
      <div className="relative">
        <img 
          src={profile.avatar_url} 
          alt={profile.login} 
          className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 grayscale group-hover:grayscale-0 transition-all group-hover:scale-105"
        />
        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-neutral-950 p-0.5 rounded-full border border-neutral-200 dark:border-neutral-900">
          <Github size={12} className="text-neutral-900 dark:text-neutral-100" />
        </div>
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
          @{profile.login}
        </h4>
        <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <GitCommit size={12} /> {profile.public_repos} Repos
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} /> {profile.followers} Followers
          </span>
        </div>
      </div>

      <div className="absolute right-4 top-4 w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
    </a>
  );
};
