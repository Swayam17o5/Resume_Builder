import { useState, useEffect } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Resume, Template } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { EducationForm } from "./EducationForm";
import { ExperienceForm } from "./ExperienceForm";
import { SkillsForm } from "./SkillsForm";
import { ProjectsForm } from "./ProjectsForm";
import { ResumeScorePanel } from "./ResumeScorePanel";
import { ResumePreview } from "./ResumePreview";
import { toast } from "@/hooks/use-toast";
import { Download, Eye, Save, EyeOff, Layout as LayoutIcon } from "lucide-react";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ResumeFormProps {
  initialResume?: Resume;
  onComplete?: (resume: Resume) => void;
}

export function ResumeForm({ initialResume, onComplete }: ResumeFormProps) {
  const { createNewResume, updateCurrentResume, exportToPdf, templates } = useResume();
  const [activeTab, setActiveTab] = useState("personal");
  const [resume, setResume] = useState<Resume | undefined>(initialResume);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(resume?.templateId || null);

  const handleUpdateResume = (updatedResume: Resume) => {
    setResume(updatedResume);
  };

  // Handle template change
  const handleTemplateChange = (templateId: string) => {
    if (!resume) return;
    
    const updatedResume: Resume = {
      ...resume,
      templateId: templateId
    };
    
    setSelectedTemplate(templateId);
    setResume(updatedResume);
    
    // Save the template change automatically
    handleSave(updatedResume);
  };

  const handleSave = async (resumeToSave?: Resume) => {
    const resumeData = resumeToSave || resume;
    if (!resumeData) return;

    setIsSaving(true);
    try {
      let savedResume: Resume | null;
      
      if (initialResume) {
        // Update existing resume
        savedResume = await updateCurrentResume(resumeData);
      } else {
        // Create new resume
        savedResume = await createNewResume(resumeData);
      }

      if (savedResume && onComplete) {
        onComplete(savedResume);
      }
      
      toast({
        title: "Resume Saved",
        description: "Your resume has been saved successfully."
      });
    } catch (error) {
      console.error("Failed to save resume:", error);
      toast({
        title: "Error",
        description: "Failed to save your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    if (!resume) return;

    setIsExporting(true);
    try {
      // Get the resume preview element directly
      const previewElement = document.getElementById(`resume-preview-${resume.id}`);
      
      if (!previewElement) {
        throw new Error('Resume preview element not found');
      }
      
      // Capture the element as a canvas
      const canvas = await html2canvas(previewElement, {
        scale: 2, // Higher resolution
        useCORS: true, // Allow images from other domains
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      // Create a PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add image to PDF
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      // If the image height exceeds a page height, create multiple pages
      let heightLeft = imgHeight;
      let position = 0;
      
      while (heightLeft >= pageHeight) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, -position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Get the PDF data URL for download
      const pdfUrl = pdf.output('dataurlstring');
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${resume.title || 'resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Success",
        description: "Your resume has been exported to PDF.",
      });
    } catch (error) {
      console.error("Failed to export resume:", error);
      toast({
        title: "Error",
        description: "Failed to export your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Add a style element for print styling
  const printStyles = `
    @media print {
      body * {
        visibility: hidden;
      }
      #resume-preview-${resume?.id}, #resume-preview-${resume?.id} * {
        visibility: visible;
      }
      #resume-preview-${resume?.id} {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
      }
    }
  `;

  // Before the return statement, add this to the component
  useEffect(() => {
    if (resume) {
      // Add print styles
      const styleElement = document.createElement('style');
      styleElement.id = 'resume-print-styles';
      styleElement.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview-${resume.id}, #resume-preview-${resume.id} * {
            visibility: visible;
          }
          #resume-preview-${resume.id} {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
          }
        }
      `;
      document.head.appendChild(styleElement);
      
      return () => {
        // Clean up styles when component unmounts
        const existingStyle = document.getElementById('resume-print-styles');
        if (existingStyle) {
          document.head.removeChild(existingStyle);
        }
      };
    }
  }, [resume?.id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {initialResume ? "Edit Resume" : "Create Resume"}
              </h2>
              <div className="flex items-center gap-2">
                {/* Template Selector */}
                {templates.length > 0 && resume && (
                  <div className="hidden md:block">
                    <Select 
                      value={resume.templateId} 
                      onValueChange={handleTemplateChange}
                    >
                      <SelectTrigger className="w-[180px] border-violet-200 text-violet-700">
                        <LayoutIcon className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Change Template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template: Template) => (
                          <SelectItem 
                            key={template.id} 
                            value={template.id}
                            className="flex items-center"
                          >
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePreview}
                  className="flex items-center text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                >
                  {showPreview ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Show Preview
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Mobile template selector */}
            {templates.length > 0 && resume && (
              <div className="mb-4 md:hidden">
                <Select 
                  value={resume.templateId} 
                  onValueChange={handleTemplateChange}
                >
                  <SelectTrigger className="w-full border-violet-200 text-violet-700">
                    <LayoutIcon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Change Template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template: Template) => (
                      <SelectItem 
                        key={template.id} 
                        value={template.id}
                      >
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <Tabs 
              value={activeTab} 
              onValueChange={(newTab) => {
                // Only save when changing tabs if there are unsaved changes
                setActiveTab(newTab);
              }}
            >
              <TabsList className="w-full grid grid-cols-5 bg-violet-50">
                <TabsTrigger value="personal" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">Personal</TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">Education</TabsTrigger>
                <TabsTrigger value="experience" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">Experience</TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">Skills</TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">Projects</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="personal" className="mt-0">
                  {resume && (
                    <PersonalDetailsForm 
                      resume={resume} 
                      onUpdate={handleUpdateResume} 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="education" className="mt-0">
                  {resume && (
                    <EducationForm 
                      resume={resume} 
                      onUpdate={handleUpdateResume} 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="experience" className="mt-0">
                  {resume && (
                    <ExperienceForm 
                      resume={resume} 
                      onUpdate={handleUpdateResume} 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="skills" className="mt-0">
                  {resume && (
                    <SkillsForm 
                      resume={resume} 
                      onUpdate={handleUpdateResume} 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="achievements" className="mt-0">
                  {resume && (
                    <ProjectsForm 
                      resume={resume} 
                      onUpdate={handleUpdateResume} 
                    />
                  )}
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  const prevTabs: Record<string, string> = {
                    personal: "personal",
                    education: "personal",
                    experience: "education",
                    skills: "experience",
                    achievements: "skills",
                  };
                  setActiveTab(prevTabs[activeTab]);
                }}
                disabled={activeTab === "personal"}
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleSave()}
                  disabled={isSaving}
                  className="flex items-center border-violet-200 text-violet-600 hover:bg-violet-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                
                {initialResume && !showPreview && (
                  <Button
                    variant="outline"
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex items-center border-amber-200 text-amber-600 hover:bg-amber-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isExporting ? "Exporting..." : "Export PDF"}
                  </Button>
                )}
              </div>

              <Button
                onClick={async () => {
                  const nextTabs: Record<string, string> = {
                    personal: "education",
                    education: "experience",
                    experience: "skills",
                    skills: "achievements",
                    achievements: "achievements",
                  };
                  
                  // Save only when clicking Next
                  try {
                    await handleSave();
                    setActiveTab(nextTabs[activeTab]);
                  } catch (error) {
                    console.error('Failed to save before navigation:', error);
                    toast({
                      title: "Error",
                      description: "Failed to save your progress. Please try again.",
                      variant: "destructive",
                    });
                  }
                }}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {activeTab === "achievements" ? "Finish" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        {resume && <ResumeScorePanel resumeId={resume.id} />}
      </div>

      {showPreview && resume && (
        <div className="lg:col-span-4 mt-6">
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Resume Preview</h2>
                {initialResume && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleExport}
                      disabled={isExporting}
                      className="flex items-center border-amber-200 text-amber-600 hover:bg-amber-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isExporting ? "Exporting..." : "Export PDF"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.print();
                      }}
                      className="flex items-center border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-3xl">
                  <ResumePreview resume={resume} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
