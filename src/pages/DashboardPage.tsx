import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useResume } from "@/contexts/ResumeContext";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeCard } from "@/components/resume/ResumeCard";
import { 
  Plus, 
  FileText, 
  Layout as TemplateIcon, 
  Award,
  BarChart3,
  TrendingUp,
  ActivityIcon 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/EmptyState";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { resumes, isLoading, refreshResumes, createNewResume, deleteResume } = useResume();
  const [recentResumes, setRecentResumes] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    refreshResumes();
  }, [refreshResumes]);

  useEffect(() => {
    // Get the 3 most recent resumes
    const sorted = [...resumes].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ).slice(0, 3);
    
    setRecentResumes(sorted);
  }, [resumes]);

  const handleCreateResume = async () => {
    try {
      const newResume = await createNewResume({
        userId: user?.id || '',
        title: 'Untitled Resume',
        templateId: 'professional-1',
        personalDetails: {
          fullName: '',
          email: '',
          phone: '',
          summary: ''
        },
        education: [],
        experience: [],
        skills: [],
        achievements: []
      });
      navigate(`/resume/${newResume.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back{user?.name ? `, ${user.name}` : ''}! Manage your resumes and create new ones.
            </p>
          </div>
          <Button 
            onClick={handleCreateResume}
            className="mt-4 md:mt-0 btn-hover shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Resume
          </Button>
        </div>

        <Tabs defaultValue="resumes" className="space-y-6">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="resumes" className="flex-1">
              <FileText className="mr-2 h-4 w-4" /> My Resumes
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex-1">
              <TemplateIcon className="mr-2 h-4 w-4" /> Templates
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex-1">
              <Award className="mr-2 h-4 w-4" /> Resume Tips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumes" className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-2">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-5 w-1/3 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-6" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-9 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : resumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <ResumeCard 
                    key={resume.id} 
                    resume={resume}
                    onDelete={async () => {
                      await deleteResume(resume.id);
                      refreshResumes();
                    }}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="flex flex-col items-center">
                    <FileText className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Resumes Yet</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      You haven't created any resumes yet. Start by creating your first professional resume.
                    </p>
                    <Button onClick={handleCreateResume} className="btn-hover shadow-sm">
                      <Plus className="mr-2 h-4 w-4" /> Create Your First Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="templates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Templates</CardTitle>
                <CardDescription>
                  Choose from our collection of professionally designed templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TemplateIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Browse Templates</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Explore our wide range of templates designed for different industries and career levels.
                  </p>
                  <Button onClick={() => navigate("/templates")} className="btn-hover shadow-sm">
                    View Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tips" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Tips & Advice</CardTitle>
                <CardDescription>
                  Expert advice to help you create a standout resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">Tailor Your Resume for Each Job</h3>
                    <p className="text-gray-600">
                      Customize your resume for each position you apply for. Match your skills and experiences to the job description to show you're the perfect candidate.
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">Quantify Your Achievements</h3>
                    <p className="text-gray-600">
                      Use numbers to highlight your accomplishments. Instead of saying "Increased sales," try "Increased sales by 25% over six months."
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">Keep It Concise</h3>
                    <p className="text-gray-600">
                      Most hiring managers spend less than 10 seconds scanning a resume. Keep your resume concise, well-organized, and focused on relevant information.
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">Use Keywords from the Job Description</h3>
                    <p className="text-gray-600">
                      Many companies use Applicant Tracking Systems (ATS) to filter resumes. Include relevant keywords from the job description to pass through these systems.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Proofread Carefully</h3>
                    <p className="text-gray-600">
                      Spelling or grammar errors can immediately disqualify you. Proofread your resume multiple times and have someone else review it as well.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
