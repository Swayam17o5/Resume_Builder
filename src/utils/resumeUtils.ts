import { Resume, Experience, Education, PersonalDetails, Skill, EducationLevel } from "@/types";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Calculate duration between two dates
export const calculateDuration = (startDate: string, endDate?: string, present?: boolean): string => {
  const start = new Date(startDate);
  const end = present ? new Date() : (endDate ? new Date(endDate) : new Date());
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  let duration = '';
  
  if (years > 0) {
    duration += `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  
  if (months > 0 || years === 0) {
    if (duration) duration += ' ';
    duration += `${years > 0 ? (months + 12 * (start.getMonth() >= end.getMonth() ? 1 : 0)) % 12 : months} ${months === 1 ? 'month' : 'months'}`;
  }
  
  return duration;
};

// Create an empty resume template
export const createEmptyResume = (userId: string): Resume => {
  return {
    id: generateId(),
    userId,
    title: "Untitled Resume",
    templateId: "modern-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    personalDetails: createEmptyPersonalDetails(),
    education: [],
    experience: [],
    skills: [],
  };
};

// Create an empty personal details object
export const createEmptyPersonalDetails = (): PersonalDetails => {
  return {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedIn: '',
    website: '',
    summary: ''
  };
};

// Create an empty education item
export const createEmptyEducation = (level: EducationLevel): Education => {
  return {
    id: generateId(),
    level,
    institution: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    present: false,
    description: "",
    gpa: "",
    location: "",
  };
};

// Create an empty experience item
export const createEmptyExperience = (): Experience => {
  return {
    id: generateId(),
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    present: false,
    description: '',
    achievements: []
  };
};

// Create an empty skill item
export const createEmptySkill = (): Skill => {
  return {
    id: generateId(),
    name: '',
    level: 'Beginner'
  };
};

// Create an empty achievement item
export const createEmptyAchievement = () => {
  return {
    id: generateId(),
    title: "",
    description: "",
    date: "",
  };
};

// Convert HTML to text
export const htmlToText = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

// Export resume to PDF
export const generatePDF = (resume: Resume): jsPDF => {
  const doc = new jsPDF();

  // Add resume content
  doc.setFontSize(20);
  doc.text(resume.personalDetails.fullName || 'Resume', 20, 20);

  // Personal Details
  doc.setFontSize(12);
  doc.text('Contact Information:', 20, 35);
  if (resume.personalDetails.email) doc.text(`Email: ${resume.personalDetails.email}`, 25, 42);
  if (resume.personalDetails.phone) doc.text(`Phone: ${resume.personalDetails.phone}`, 25, 49);
  if (resume.personalDetails.address) doc.text(`Address: ${resume.personalDetails.address}`, 25, 56);

  let currentY = 70;

  // Education Section
  if (resume.education.length > 0) {
    doc.setFontSize(14);
    doc.text('Education', 20, currentY);
    currentY += 10;
    doc.setFontSize(12);

    resume.education.forEach(edu => {
      doc.text(edu.level, 25, currentY);
      currentY += 7;
      doc.text(edu.institution, 25, currentY);
      currentY += 7;
      if (edu.fieldOfStudy) {
        doc.text(edu.fieldOfStudy, 25, currentY);
        currentY += 7;
      }
      doc.text(`${edu.startDate} - ${edu.present ? 'Present' : edu.endDate || ''}`, 25, currentY);
      currentY += 7;
      if (edu.gpa) {
        doc.text(`GPA/Percentage: ${edu.gpa}`, 25, currentY);
        currentY += 7;
      }
      currentY += 5;
    });
  }

  // Experience Section
  if (resume.experience.length > 0) {
    doc.setFontSize(14);
    doc.text('Experience', 20, currentY);
    currentY += 10;
    doc.setFontSize(12);

    resume.experience.forEach(exp => {
      doc.text(exp.position, 25, currentY);
      currentY += 7;
      doc.text(exp.company, 25, currentY);
      currentY += 7;
      doc.text(`${exp.startDate} - ${exp.present ? 'Present' : exp.endDate || ''}`, 25, currentY);
      currentY += 7;
      if (exp.description) {
        const lines = doc.splitTextToSize(exp.description, 170);
        doc.text(lines, 25, currentY);
        currentY += lines.length * 7;
      }
      currentY += 5;
    });
  }

  // Skills Section
  if (resume.skills.length > 0) {
    doc.setFontSize(14);
    doc.text('Skills', 20, currentY);
    currentY += 10;
    doc.setFontSize(12);

    const skillsText = resume.skills.map(skill => 
      `${skill.name}${skill.level ? ` (${skill.level})` : ''}`
    ).join(', ');
    
    const lines = doc.splitTextToSize(skillsText, 170);
    doc.text(lines, 25, currentY);
  }

  return doc;
};
