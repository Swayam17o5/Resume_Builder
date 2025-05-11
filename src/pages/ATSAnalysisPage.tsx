import React from "react";
import { ATSAnalysis } from "@/components/resume/ATSAnalysis";

const ATSAnalysisPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">ATS Resume Analysis</h1>
      <ATSAnalysis />
    </div>
  );
};

export default ATSAnalysisPage;
