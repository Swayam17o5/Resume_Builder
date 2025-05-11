import { Resume, ResumeScore, Template, ScoreFeedback } from '@/types';

// Mock templates
export const templates: Template[] = [
  {
    id: 'professional-1',
    name: 'Gregory Walls',
    previewImage: '/templates/professional-1.png',
    description: 'A classic design with sidebar layout for professional roles.',
    category: 'Professional'
  },
  {
    id: 'modern-1',
    name: 'Travis Willis',
    previewImage: '/templates/modern-1.png',
    description: 'A clean design with colored header and profile photo.',
    category: 'Modern'
  },
  {
    id: 'creative-1',
    name: 'Patricia Giordano',
    previewImage: '/templates/creative-1.png',
    description: 'A vibrant template with colored header and rounded elements.',
    category: 'Creative'
  },
  {
    id: 'simple-1',
    name: 'Howard Jones',
    previewImage: '/templates/simple-1.png',
    description: 'A minimalist design perfect for legal and corporate roles.',
    category: 'Simple'
  },
  {
    id: 'modern-2',
    name: 'Sophie Wright',
    previewImage: '/templates/modern-2.png',
    description: 'A sophisticated design with clean sections and icons.',
    category: 'Modern'
  },
  {
    id: 'creative-2',
    name: 'Sebastian Wilder',
    previewImage: '/templates/creative-2.png',
    description: 'An eye-catching template with colorful sidebar for creative roles.',
    category: 'Creative'
  }
];

// Mock storage for resumes
let resumes: Record<string, Resume> = {};

// Load resumes from localStorage
const loadResumes = () => {
  try {
    const storedResumes = localStorage.getItem('resumeBuilderResumes');
    if (storedResumes) {
      resumes = JSON.parse(storedResumes);
    }
  } catch (error) {
    console.error('Failed to load resumes:', error);
  }
};

// Save resumes to localStorage
const saveResumes = () => {
  try {
    localStorage.setItem('resumeBuilderResumes', JSON.stringify(resumes));
  } catch (error) {
    console.error('Failed to save resumes:', error);
  }
};

// Get all resumes for a user
export const getUserResumes = (userId: string): Resume[] => {
  loadResumes();
  return Object.values(resumes).filter(resume => resume.userId === userId);
};

// Get a single resume by ID
export const getResumeById = (id: string): Resume | null => {
  loadResumes();
  return resumes[id] || null;
};

// Create a new resume
export const createResume = (resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>): Resume => {
  const newResume: Resume = {
    ...resume,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  resumes[newResume.id] = newResume;
  saveResumes();
  return newResume;
};

// Update an existing resume
export const updateResume = (id: string, data: Partial<Resume>): Resume => {
  if (!resumes[id]) {
    throw new Error('Resume not found');
  }

  const updatedResume: Resume = {
    ...resumes[id],
    ...data,
    updatedAt: new Date().toISOString()
  };

  resumes[id] = updatedResume;
  saveResumes();
  return updatedResume;
};

// Delete a resume
export const deleteResume = (id: string): void => {
  if (!resumes[id]) {
    throw new Error('Resume not found');
  }

  delete resumes[id];
  saveResumes();
};

// Score a resume
export const scoreResume = (resume: Resume): ResumeScore => {
  let totalScore = 0;
  const feedback: ScoreFeedback = {
    overall: "",
    improvements: []
  };

  // Score education (0-35)
  let educationScore = 0;
  if (resume.education.length > 0) {
    // Base score for having education entries (max 15)
    const baseScore = Math.min(resume.education.length * 5, 15);
    educationScore += baseScore;

    // Additional points for completeness (max 20)
    let completenessScore = 0;
    resume.education.forEach(edu => {
      let entryScore = 0;
      
      // Essential fields (max 4)
      if (edu.institution) entryScore += 1;
      if (edu.fieldOfStudy) entryScore += 1;
      if (edu.startDate) entryScore += 1;
      if (edu.endDate || edu.present) entryScore += 1;
      
      // Optional fields (max 3)
      if (edu.description && edu.description.length > 20) entryScore += 1;
      if (edu.location) entryScore += 1;
      if (edu.gpa) entryScore += 1;
      
      // Add weighted score for this entry
      completenessScore += Math.min(entryScore, 7) * (20 / (resume.education.length * 7));
    });

    educationScore += Math.round(completenessScore);
    educationScore = Math.min(educationScore, 35);
  }

  // Score experience (0-35)
  let experienceScore = 0;
  if (resume.experience.length > 0) {
    // Base score for having experience (max 15)
    experienceScore = Math.min(resume.experience.length * 5, 15);
    
    // Additional points for completeness (max 20)
    let completenessScore = 0;
    resume.experience.forEach(exp => {
      let entryScore = 0;
      
      // Essential fields (max 4)
      if (exp.company) entryScore += 1;
      if (exp.position) entryScore += 1;
      if (exp.startDate) entryScore += 1;
      if (exp.endDate || exp.present) entryScore += 1;
      
      // Description quality (max 3)
      if (exp.description) {
        const words = exp.description.split(' ').length;
        if (words >= 30) entryScore += 3;
        else if (words >= 20) entryScore += 2;
        else if (words >= 10) entryScore += 1;
      }
      
      // Add weighted score for this entry
      completenessScore += Math.min(entryScore, 7) * (20 / (resume.experience.length * 7));
    });

    experienceScore += Math.round(completenessScore);
    experienceScore = Math.min(experienceScore, 35);
  }

  // Score skills (0-30)
  let skillsScore = 0;
  if (resume.skills.length > 0) {
    // Base score for having skills (max 10)
    skillsScore = Math.min(resume.skills.length * 2, 10);
    
    // Additional points for completeness (max 20)
    let completenessScore = 0;
    resume.skills.forEach(skill => {
      if (skill.name && skill.level) {
        completenessScore += 2;
      } else if (skill.name) {
        completenessScore += 1;
      }
    });

    skillsScore += Math.min(completenessScore, 20);
    skillsScore = Math.min(skillsScore, 30);
  }

  // Calculate total score
  totalScore = educationScore + experienceScore + skillsScore;

  // Generate feedback
  const improvements: string[] = [];

  if (educationScore < 35) {
    if (resume.education.length === 0) {
      improvements.push("Add your educational background starting with SSC");
    } else {
      const missingLevels = ['SSC', 'HSC', 'Higher Degree'].filter(
        level => !resume.education.some(edu => edu.level === level)
      );
      if (missingLevels.length > 0) {
        improvements.push(`Add your ${missingLevels.join(", ")} education details`);
      }
      if (resume.education.some(edu => !edu.description)) {
        improvements.push("Add descriptions to your education entries");
      }
      if (resume.education.some(edu => !edu.gpa)) {
        improvements.push("Add GPA/percentage to your education entries");
      }
    }
  }

  if (experienceScore < 35) {
    if (resume.experience.length === 0) {
      improvements.push("Add your work experience or relevant projects");
    } else {
      if (resume.experience.some(exp => !exp.description || exp.description.split(' ').length < 20)) {
        improvements.push("Enhance your experience descriptions with more details (aim for 20+ words)");
      }
      if (resume.experience.some(exp => !exp.location)) {
        improvements.push("Add locations to your experience entries");
      }
    }
  }

  if (skillsScore < 30) {
    if (resume.skills.length === 0) {
      improvements.push("Add relevant skills to your resume");
    } else if (resume.skills.some(skill => !skill.level)) {
      improvements.push("Add proficiency levels to your skills");
    }
  }

  // Set overall feedback based on total score
  if (totalScore >= 90) {
    feedback.overall = "Excellent resume! You have a comprehensive and well-detailed profile.";
  } else if (totalScore >= 70) {
    feedback.overall = "Good resume! Consider the suggestions below to make it even better.";
  } else if (totalScore >= 50) {
    feedback.overall = "Your resume is coming along. Follow the suggestions below to strengthen it.";
  } else {
    feedback.overall = "Your resume needs more details. Use the suggestions below as a guide.";
  }

  feedback.improvements = improvements;

  return {
    total: totalScore,
    education: educationScore,
    experience: experienceScore,
    skills: skillsScore,
    feedback
  };
};

// Get all available templates
export const getTemplates = (): Template[] => {
  return templates;
};

// Get a template by ID
export const getTemplateById = (id: string): Template | null => {
  return templates.find(template => template.id === id) || null;
};

// Save resume as PDF
export const exportResumeToPdf = async (resumeId: string): Promise<string> => {
  // Get the resume
  const resume = getResumeById(resumeId);
  if (!resume) {
    throw new Error('Resume not found');
  }

  // Import the PDF generator
  const { generatePDF } = await import('../utils/resumeUtils');
  
  // Generate the PDF
  const doc = generatePDF(resume);
  
  // Return PDF as data URL for direct download
  return doc.output('dataurlstring');
};

// Initialize service
export const initResumeService = () => {
  loadResumes();
};
