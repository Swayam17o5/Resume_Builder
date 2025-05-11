
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useResume } from "@/contexts/ResumeContext";
import { Layout } from "@/components/layout/Layout";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Resume } from "@/types";

export default function ResumeEditorPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getResumeById, setCurrentResume, currentResume, isLoading } = useResume();
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (resumeId) {
      const fetchedResume = getResumeById(resumeId);
      
      if (fetchedResume) {
        setResume(fetchedResume);
        setCurrentResume(fetchedResume);
      } else {
        // Resume not found, navigate back to resumes page
        navigate("/resumes");
      }
    }
  }, [resumeId, getResumeById, setCurrentResume, navigate]);

  const handleComplete = (updatedResume: Resume) => {
    setResume(updatedResume);
  };

  return (
    <Layout withFooter={false}>
      <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
        <div className="mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4" 
            onClick={() => navigate("/resumes")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Resumes
          </Button>
          
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            {isLoading ? (
              <Skeleton className="h-9 w-64" />
            ) : (
              resume?.title || "Edit Resume"
            )}
          </h1>
          
          <p className="text-gray-600">
            {isLoading ? (
              <Skeleton className="h-5 w-96 mt-1" />
            ) : (
              "Edit your resume content and see real-time scoring and suggestions"
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-6">
            <div className="bg-white rounded-lg p-6">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ) : resume ? (
          <ResumeForm initialResume={resume} onComplete={handleComplete} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600">Resume not found</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
