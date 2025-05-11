import { create } from "zustand";
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;
const stemmer = natural.PorterStemmer;

export interface ATSScore {
  overall: number;
  education: number;
  experience: number;
  skills: number;
  missingKeywords: string[];
  suggestions: string[];
  keywordMatches: { keyword: string; relevance: number }[];
}

interface ATSState {
  jobDescription: string;
  atsScore: ATSScore | null;
  setJobDescription: (text: string) => void;
  analyzeResume: (resumeText: string) => Promise<void>;
}

export const useATSStore = create<ATSState>((set) => ({
  jobDescription: "",
  atsScore: null,
  setJobDescription: (text) => set({ jobDescription: text }),
  analyzeResume: async (resumeText) => {
    const jobDesc = useATSStore.getState().jobDescription;

    // Initialize TF-IDF
    const tfidf = new TfIdf();
    tfidf.addDocument(jobDesc);
    tfidf.addDocument(resumeText);

    // Extract keywords using TF-IDF
    const extractKeywords = (text: string): string[] => {
      const tokens = tokenizer.tokenize(text) || [];
      return tokens
        .map(token => token.toLowerCase())
        .filter(token => 
          token.length > 2 && 
          !natural.stopwords.includes(token)
        );
    };

    // Get stemmed version of words for better matching
    const stemWord = (word: string): string => stemmer.stem(word);

    const jobKeywords = extractKeywords(jobDesc);
    const resumeKeywords = extractKeywords(resumeText);

    // Calculate keyword relevance using TF-IDF
    const keywordMatches = jobKeywords.map(keyword => {
      const stemmedKeyword = stemWord(keyword);
      const relevance = resumeKeywords.some(rk => stemWord(rk) === stemmedKeyword) ? 
        tfidf.tfidf(keyword, 1) : 0;
      return { keyword, relevance };
    }).sort((a, b) => b.relevance - a.relevance);

    const missingKeywords = keywordMatches
      .filter(k => k.relevance === 0)
      .map(k => k.keyword);

    // Calculate section-specific scores using contextual keywords
    const calculateSectionScore = (text: string, sectionKeywords: string[]): number => {
      const sectionMatches = sectionKeywords.filter(keyword => {
        const stemmedKeyword = stemWord(keyword);
        return extractKeywords(text).some(tk => stemWord(tk) === stemmedKeyword);
      });
      return (sectionMatches.length / sectionKeywords.length) * 100;
    };

    // Section-specific keywords
    const educationKeywords = [
      "degree", "university", "college", "bachelor", "master", "phd", 
      "diploma", "certification", "graduate", "academic", "gpa"
    ];

    const experienceKeywords = [
      "experience", "work", "job", "position", "role", "responsibility",
      "project", "team", "led", "managed", "developed", "implemented"
    ];

    const skillsKeywords = keywordMatches
      .filter(k => k.relevance > 0)
      .map(k => k.keyword);

    // Calculate scores
    const educationScore = calculateSectionScore(resumeText, educationKeywords);
    const experienceScore = calculateSectionScore(resumeText, experienceKeywords);
    const skillsScore = (skillsKeywords.length / jobKeywords.length) * 100;

    // Overall score with weighted sections
    const overall = (
      (educationScore * 0.3) +
      (experienceScore * 0.4) +
      (skillsScore * 0.3)
    );

    // Generate suggestions based on analysis
    const suggestions = [
      missingKeywords.length > 0 ? 
        `Add these missing keywords: ${missingKeywords.slice(0, 5).join(", ")}` : 
        "Good keyword coverage!",
      skillsScore < 70 ? 
        "Consider adding more relevant technical skills" : 
        "Strong skills match!",
      experienceScore < 70 ? 
        "Add more detailed work experience with action verbs" : 
        "Good experience section!",
      educationScore < 70 ? 
        "Ensure education section includes relevant certifications and degrees" : 
        "Education section looks good!"
    ].filter(s => !s.includes("looks good") && !s.includes("Strong") && !s.includes("Good"));

    const score: ATSScore = {
      overall,
      education: educationScore,
      experience: experienceScore,
      skills: skillsScore,
      missingKeywords,
      suggestions: suggestions.length > 0 ? suggestions : ["Your resume is well-optimized for this job!"],
      keywordMatches: keywordMatches.filter(k => k.relevance > 0).slice(0, 10)
    };

    set({ atsScore: score });
  }
}));
