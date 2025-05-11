import { Resume } from "@/types";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  Download, 
  Edit2, 
  FileText, 
  Trash2,
  FileEdit,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/contexts/ResumeContext";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { formatDate } from "@/utils/resumeUtils";
import { generatePDF } from "@/utils/resumeUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const navigate = useNavigate();
  const { getTemplateById } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  
  const template = getTemplateById(resume.templateId);
  
  const getScoreColor = (score?: number) => {
    if (!score) return "bg-gray-200 text-gray-600";
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-blue-100 text-blue-800";
    if (score >= 40) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };
  
  const handleEdit = () => {
    navigate(`/resume/${resume.id}`);
  };
  
  const handleDelete = async () => {
    await onDelete(resume.id);
  };
  
  const handleExport = async () => {
    setIsExporting(true);
    try {
      await generatePDF(resume);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePreview = () => {
    navigate(`/resume/${resume.id}?preview=true`);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium line-clamp-1">{resume.personalDetails.fullName || "Unnamed Resume"}</CardTitle>
        <CardDescription className="text-gray-500 text-sm">
          Last updated {formatDate(resume.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <div className="text-sm text-gray-500">
          <div className="line-clamp-1">
            <span className="font-medium">Job Title:</span> {resume.personalDetails.jobTitle || "Not specified"}
          </div>
          <div className="line-clamp-1">
            <span className="font-medium">Email:</span> {resume.personalDetails.email || "Not specified"}
          </div>
          <div className="line-clamp-1">
            <span className="font-medium">Template:</span> {template?.name || "Default"}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                onClick={handleEdit}
              >
                <FileEdit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit this resume</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handlePreview}
                  className="text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Preview</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview resume</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleExport}
                  className="text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                  disabled={isExporting}
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download as PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <AlertDialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this resume? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-700 text-gray-200 hover:bg-gray-600">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
