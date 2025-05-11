import React, { createContext, useContext, useEffect, useState } from 'react';
import { Resume, ResumeScore, Template } from '@/types';
import { 
  initResumeService,
  getUserResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  scoreResume,
  getTemplates,
  getTemplateById,
  exportResumeToPdf
} from '@/services/resumeService';
import { useAuth } from './AuthContext';
import { useStatistics } from './StatisticsContext';
import { toast } from '@/hooks/use-toast';

interface ResumeContextType {
  resumes: Resume[];
  templates: Template[];
  isLoading: boolean;
  error: string | null;
  currentResume: Resume | null;
  currentScore: ResumeScore | null;
  refreshResumes: () => void;
  getResumeById: (id: string) => Resume | null;
  getTemplateById: (id: string) => Template | null;
  createNewResume: (resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Resume>;
  updateCurrentResume: (data: Partial<Resume>) => Promise<Resume | null>;
  deleteResume: (id: string) => Promise<void>;
  setCurrentResume: (resume: Resume | null) => void;
  scoreCurrentResume: () => ResumeScore | null;
  exportToPdf: (resumeId: string) => Promise<string>;
}

const ResumeContext = createContext<ResumeContextType>({
  resumes: [],
  templates: [],
  isLoading: false,
  error: null,
  currentResume: null,
  currentScore: null,
  refreshResumes: () => {},
  getResumeById: () => null,
  getTemplateById: () => null,
  createNewResume: async () => {
    throw new Error('Not implemented');
  },
  updateCurrentResume: async () => null,
  deleteResume: async () => {},
  setCurrentResume: () => {},
  scoreCurrentResume: () => null,
  exportToPdf: async () => '',
});

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { incrementResumes, incrementDownloads } = useStatistics();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [currentScore, setCurrentScore] = useState<ResumeScore | null>(null);

  // Load templates
  useEffect(() => {
    setTemplates(getTemplates());
  }, []);

  // Initialize resume service
  useEffect(() => {
    initResumeService();
  }, []);

  // Load user's resumes when user changes
  useEffect(() => {
    refreshResumes();
  }, [user]);

  const refreshResumes = () => {
    if (user) {
      try {
        const userResumes = getUserResumes(user.id);
        setResumes(userResumes);
      } catch (error) {
        setError('Failed to load resumes');
        console.error(error);
      }
    } else {
      setResumes([]);
    }
  };

  const handleGetResumeById = (id: string) => {
    return getResumeById(id);
  };

  const handleGetTemplateById = (id: string) => {
    return getTemplateById(id);
  };

  const handleCreateNewResume = async (resumeData: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) {
      throw new Error('User must be logged in to create a resume');
    }

    setIsLoading(true);
    try {
      const newResume = await createResume(resumeData);
      setResumes(prev => [...prev, newResume]);
      setCurrentResume(newResume);
      incrementResumes(); // Track new resume creation
      toast({
        title: "Success",
        description: "Resume created successfully",
      });
      return newResume;
    } catch (error) {
      console.error('Failed to create resume:', error);
      toast({
        title: "Error",
        description: "Failed to create resume",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCurrentResume = async (data: Partial<Resume>): Promise<Resume | null> => {
    if (!currentResume) {
      setError('No resume selected');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedResume = updateResume(currentResume.id, data);
      refreshResumes();
      setCurrentResume(updatedResume);
      
      const score = scoreResume(updatedResume);
      setCurrentScore(score);
      
      toast({
        title: 'Resume Updated',
        description: 'Your resume was updated successfully.'
      });
      
      return updatedResume;
    } catch (error: any) {
      setError(error.message || 'Failed to update resume');
      toast({
        title: 'Error',
        description: error.message || 'Failed to update resume',
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      deleteResume(id);
      
      if (currentResume && currentResume.id === id) {
        setCurrentResume(null);
        setCurrentScore(null);
      }
      
      refreshResumes();
      
      toast({
        title: 'Resume Deleted',
        description: 'Your resume was deleted successfully.'
      });
    } catch (error: any) {
      setError(error.message || 'Failed to delete resume');
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete resume',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetCurrentResume = (resume: Resume | null) => {
    setCurrentResume(resume);
    
    if (resume) {
      const score = scoreResume(resume);
      setCurrentScore(score);
    } else {
      setCurrentScore(null);
    }
  };

  const handleScoreCurrentResume = (): ResumeScore | null => {
    if (!currentResume) {
      return null;
    }
    
    const score = scoreResume(currentResume);
    setCurrentScore(score);
    return score;
  };

  const handleExportToPdf = async (resumeId: string) => {
    setIsLoading(true);
    try {
      const pdfUrl = await exportResumeToPdf(resumeId);
      incrementDownloads(); // Track resume download
      return pdfUrl;
    } catch (error) {
      console.error('Failed to export resume:', error);
      toast({
        title: "Error",
        description: "Failed to export resume to PDF",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    resumes,
    templates,
    isLoading,
    error,
    currentResume,
    currentScore,
    refreshResumes,
    getResumeById: handleGetResumeById,
    getTemplateById: handleGetTemplateById,
    createNewResume: handleCreateNewResume,
    updateCurrentResume: handleUpdateCurrentResume,
    deleteResume: handleDeleteResume,
    setCurrentResume: handleSetCurrentResume,
    scoreCurrentResume: handleScoreCurrentResume,
    exportToPdf: handleExportToPdf,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export const useResume = () => useContext(ResumeContext);
