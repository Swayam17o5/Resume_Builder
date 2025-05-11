export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
  score?: number;
  personalDetails: PersonalDetails;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  achievements?: Achievement[];
}

export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  linkedIn?: string;
  website?: string;
  summary?: string;
  photo?: string;
  jobTitle?: string;
  location?: string;
}

export type EducationLevel = 'SSC' | 'HSC' | 'Higher Degree';

export interface Education {
  id: string;
  level: EducationLevel;
  institution: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  present?: boolean;
  description?: string;
  gpa?: string;
  location?: string;
  degree?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  present?: boolean;
  description: string;
  achievements?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Template {
  id: string;
  name: string;
  previewImage: string;
  description: string;
  category: 'Professional' | 'Creative' | 'Simple' | 'Modern';
}

export interface ResumeScore {
  total: number;
  education: number;  // Out of 35
  experience: number; // Out of 35
  skills: number;     // Out of 30
  feedback: ScoreFeedback;
}

export interface ScoreFeedback {
  overall: string;
  education?: string;
  experience?: string;
  skills?: string;
  improvements: string[];
}

export interface Achievement {
  title: string;
  description?: string;
  date?: string;
}
