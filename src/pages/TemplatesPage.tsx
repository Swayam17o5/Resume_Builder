import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useResume } from "@/contexts/ResumeContext";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Search } from "lucide-react";
import { TemplateCard } from "@/components/resume/TemplateCard";
import { Template } from "@/types";
import { createEmptyResume } from "@/utils/resumeUtils";

export default function TemplatesPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { templates, createNewResume } = useResume();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [creationError, setCreationError] = useState<string | null>(null);
  
  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setResumeTitle(`My ${template.name} Resume`);
    setCreationError(null);
    setIsDialogOpen(true);
  };
  
  const handleCreateResume = async () => {
    if (!user || !selectedTemplate) return;
    
    setIsCreating(true);
    setCreationError(null);
    
    try {
      // Prepare the resume data before showing the dialog
      const newResume = createEmptyResume(
        user.id, 
        selectedTemplate.id, 
        resumeTitle || `My ${selectedTemplate.name} Resume`
      );
      
      // Create the resume with optimized performance
      const createdResume = await createNewResume(newResume);
      
      // Close the dialog before navigation for better UX
      setIsDialogOpen(false);
      
      // Navigate to the editor page
      setTimeout(() => {
        navigate(`/resume/${createdResume.id}`);
      }, 100);
    } catch (error) {
      console.error("Failed to create resume:", error);
      setCreationError("There was an error creating your resume. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  if (!isAuthenticated) {
    navigate("/signin");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">Resume Templates</h1>
            <p className="text-gray-600">
              Choose a template to create your professional resume
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                  <SelectItem value="Simple">Simple</SelectItem>
                  <SelectItem value="Modern">Modern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Templates grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate?.id === template.id}
                onSelect={handleSelectTemplate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Templates Found</h3>
            <p className="text-gray-600 mb-4">
              No templates match your current filters. Try adjusting your search criteria.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Create Resume Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        // Only allow closing if we're not in the middle of creating
        if (!isCreating) {
          setIsDialogOpen(open);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Give your resume a title to help you identify it later.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resumeTitle">Resume Title</Label>
              <Input
                id="resumeTitle"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="e.g. Marketing Manager Resume"
                disabled={isCreating}
              />
            </div>
            
            {selectedTemplate && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium">Selected Template:</p>
                <p className="text-gray-600">{selectedTemplate.name}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedTemplate.description}</p>
              </div>
            )}
            
            {creationError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {creationError}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateResume} 
              disabled={!resumeTitle || isCreating}
              className="relative"
            >
              {isCreating ? (
                <>
                  <span className="opacity-0">Create Resume</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  Create Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
