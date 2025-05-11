import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Statistics {
  totalResumes: number;
  totalDownloads: number;
  lastCreated?: Date;
  lastDownloaded?: Date;
}

interface StatisticsContextType {
  statistics: Statistics;
  incrementResumes: () => void;
  incrementDownloads: () => void;
}

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export function StatisticsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [statistics, setStatistics] = useState<Statistics>({
    totalResumes: 0,
    totalDownloads: 0,
  });

  // Load statistics from localStorage when component mounts
  useEffect(() => {
    if (user) {
      const savedStats = localStorage.getItem(`user-stats-${user.id}`);
      if (savedStats) {
        setStatistics(JSON.parse(savedStats));
      }
    }
  }, [user]);

  // Save statistics to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`user-stats-${user.id}`, JSON.stringify(statistics));
    }
  }, [statistics, user]);

  const incrementResumes = () => {
    setStatistics(prev => ({
      ...prev,
      totalResumes: prev.totalResumes + 1,
      lastCreated: new Date(),
    }));
  };

  const incrementDownloads = () => {
    setStatistics(prev => ({
      ...prev,
      totalDownloads: prev.totalDownloads + 1,
      lastDownloaded: new Date(),
    }));
  };

  return (
    <StatisticsContext.Provider value={{ statistics, incrementResumes, incrementDownloads }}>
      {children}
    </StatisticsContext.Provider>
  );
}

export function useStatistics() {
  const context = useContext(StatisticsContext);
  if (context === undefined) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
}
