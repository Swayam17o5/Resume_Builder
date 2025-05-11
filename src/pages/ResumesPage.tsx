import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useResume } from "@/contexts/ResumeContext";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeCard } from "@/components/resume/ResumeCard";
import { Plus, Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/EmptyState";

export default function ResumesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { resumes, isLoading, refreshResumes, createResume, deleteResume } = useResume();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    refreshResumes();
  }, [refreshResumes]);

  const filteredResumes = resumes.filter((resume) =>
    resume.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resume.personalDetails?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateResume = () => {
    navigate("/templates");
  };

  const handleDeleteResume = async (id: string) => {
    await deleteResume(id);
    refreshResumes();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">My Resumes</h1>
            <p className="text-gray-600">
              Manage and edit your collection of professional resumes
            </p>
          </div>
          <Button 
            onClick={handleCreateResume}
            className="mt-4 md:mt-0 btn-hover shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Resume
          </Button>
        </div>

        {/* Search bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-8">
          <div className="relative max-w-md">
            <Input
              placeholder="Search your resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Resumes grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} onDelete={handleDeleteResume} />
            ))}
          </div>
        ) : resumes.length > 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Matching Resumes</h3>
            <p className="text-gray-600 mb-4">
              No resumes match your search. Try a different search term or clear your search.
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Resumes Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't created any resumes yet. It only takes a few minutes to create a professional resume.
              </p>
              <Button onClick={handleCreateResume} className="shadow-sm">
                Create Your First Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
