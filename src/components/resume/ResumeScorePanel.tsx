import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { ResumeScore } from "@/types";

interface ResumeScorePanelProps {
  resumeId: string;
}

export function ResumeScorePanel({ resumeId }: ResumeScorePanelProps) {
  const { getResumeById, currentScore, isLoading } = useResume();
  const [score, setScore] = useState<ResumeScore | null>(currentScore);

  useEffect(() => {
    if (currentScore) {
      setScore(currentScore);
    }
  }, [currentScore]);

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-7 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!score) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resume Score</CardTitle>
          <CardDescription>
            Complete your resume to see your score and get improvement suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">
              Add more content to your resume to receive a comprehensive score and feedback.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Score levels
  const getScoreLevel = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return "excellent";
    if (percentage >= 60) return "good";
    if (percentage >= 40) return "average";
    return "poor";
  };

  const getScoreColor = (level: string) => {
    switch (level) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-violet-600";
      case "average":
        return "text-orange-500";
      case "poor":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getProgressColor = (level: string) => {
    switch (level) {
      case "excellent":
        return "bg-green-600";
      case "good":
        return "bg-violet-600";
      case "average":
        return "bg-orange-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Overall score level
  const overallLevel = getScoreLevel(score.total, 100);
  const overallColor = getScoreColor(overallLevel);
  const overallProgressColor = getProgressColor(overallLevel);

  // General resume tips for freshers
  const fresherTips = [
    "Focus on education, skills, and projects if you lack professional experience",
    "Include internships, volunteer work, or part-time jobs to show work ethic",
    "Highlight relevant coursework that demonstrates industry knowledge",
    "Showcase academic achievements, honors, and relevant extracurricular activities",
    "Create a strong objective statement that emphasizes your passion and learning mindset",
    "Include personal projects or contributions that demonstrate your skills",
    "Use a clean, professional template that's easy to scan"
  ];

  return (
    <Card className="sticky top-24 animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          Resume Score
          <span className={`text-2xl font-bold ${overallColor}`}>
            {score.total}/100
          </span>
        </CardTitle>
        <CardDescription>
          Your resume's overall rating and improvement suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Overall Score</span>
            <span className="text-sm font-medium">{score.total}%</span>
          </div>
          <Progress 
            value={score.total} 
            className="h-2.5"
            style={{ 
              backgroundColor: "rgba(0,0,0,0.1)", 
              overflow: "hidden"
            }}
          >
            <div 
              className={`h-full ${overallProgressColor} transition-all duration-500`} 
              style={{ width: `${score.total}%` }}
            />
          </Progress>
          <p className="mt-3 text-sm">{score.feedback.overall}</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="section-1">
            <AccordionTrigger className="text-sm font-medium">
              Score Breakdown
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {/* Education Score */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Education</span>
                    <span className="text-sm font-medium">
                      {score.education}/35
                    </span>
                  </div>
                  <Progress 
                    value={(score.education / 35) * 100} 
                    className="h-1.5"
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    <div 
                      className={`h-full ${getProgressColor(getScoreLevel(score.education, 35))}`}
                      style={{ width: `${(score.education / 35) * 100}%` }}
                    />
                  </Progress>
                </div>

                {/* Experience Score */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Experience</span>
                    <span className="text-sm font-medium">
                      {score.experience}/35
                    </span>
                  </div>
                  <Progress 
                    value={(score.experience / 35) * 100} 
                    className="h-1.5"
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    <div 
                      className={`h-full ${getProgressColor(getScoreLevel(score.experience, 35))}`}
                      style={{ width: `${(score.experience / 35) * 100}%` }}
                    />
                  </Progress>
                </div>

                {/* Skills Score */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Skills</span>
                    <span className="text-sm font-medium">
                      {score.skills}/30
                    </span>
                  </div>
                  <Progress 
                    value={(score.skills / 30) * 100} 
                    className="h-1.5"
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    <div 
                      className={`h-full ${getProgressColor(getScoreLevel(score.skills, 30))}`}
                      style={{ width: `${(score.skills / 30) * 100}%` }}
                    />
                  </Progress>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section-2">
            <AccordionTrigger className="text-sm font-medium">
              Detailed Feedback
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {score.feedback.education && (
                  <div>
                    <h4 className="text-sm font-medium">Education</h4>
                    <p className="text-sm text-gray-600">{score.feedback.education}</p>
                  </div>
                )}
                
                {score.feedback.experience && (
                  <div>
                    <h4 className="text-sm font-medium">Experience</h4>
                    <p className="text-sm text-gray-600">{score.feedback.experience}</p>
                  </div>
                )}
                
                {score.feedback.skills && (
                  <div>
                    <h4 className="text-sm font-medium">Skills</h4>
                    <p className="text-sm text-gray-600">{score.feedback.skills}</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section-3">
            <AccordionTrigger className="text-sm font-medium">
              Improvement Suggestions
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pt-2">
                {score.feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{improvement}</span>
                  </li>
                ))}
                
                {score.feedback.improvements.length === 0 && (
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Great job! Your resume looks complete and well-structured.</span>
                  </li>
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section-4">
            <AccordionTrigger className="text-sm font-medium text-violet-600">
              <div className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                Tips for Freshers
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-3 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-md">
                <h4 className="text-sm font-medium text-violet-800 mb-2">
                  New to the job market? Here's how to make your resume stand out:
                </h4>
                <ul className="space-y-2">
                  {fresherTips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Lightbulb className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
