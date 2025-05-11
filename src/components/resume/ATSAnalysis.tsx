import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useATSStore } from "@/services/atsService";

export const ATSAnalysis = () => {
  const { jobDescription, atsScore, setJobDescription, analyzeResume } = useATSStore();
  const [resumeText, setResumeText] = useState("");

  const handleAnalyze = async () => {
    if (!jobDescription || !resumeText) return;
    await analyzeResume(resumeText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>ATS Analysis Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Description</label>
            <Textarea
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Resume Content</label>
            <Textarea
              placeholder="Paste resume content here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          <Button onClick={handleAnalyze} className="w-full">
            Analyze Resume
          </Button>
        </CardContent>
      </Card>

      {atsScore && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Overall Match</span>
                  <span>{Math.round(atsScore.overall)}%</span>
                </div>
                <Progress value={atsScore.overall} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Education</span>
                  <span>{Math.round(atsScore.education)}%</span>
                </div>
                <Progress value={atsScore.education} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Experience</span>
                  <span>{Math.round(atsScore.experience)}%</span>
                </div>
                <Progress value={atsScore.experience} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Skills</span>
                  <span>{Math.round(atsScore.skills)}%</span>
                </div>
                <Progress value={atsScore.skills} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Top Keyword Matches</h3>
              <div className="flex flex-wrap gap-2">
                {atsScore.keywordMatches.map(({ keyword, relevance }, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm"
                    title={`Relevance: ${Math.round(relevance * 100)}%`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {atsScore.missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Suggestions</h3>
              <ul className="list-disc pl-4 space-y-1">
                {atsScore.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
