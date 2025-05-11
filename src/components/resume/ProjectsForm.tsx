import { useState } from "react";
import { Resume, Achievement } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { createEmptyAchievement } from "@/utils/resumeUtils";

interface ProjectsFormProps {
  resume: Resume;
  onUpdate: (updatedResume: Resume) => void;
}

export function ProjectsForm({ resume, onUpdate }: ProjectsFormProps) {
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});

  const handleAddProject = () => {
    const newProject = createEmptyAchievement();
    
    const updatedResume: Resume = {
      ...resume,
      achievements: [...resume.achievements, newProject],
    };
    
    onUpdate(updatedResume);
    setEditMode({ ...editMode, [newProject.id]: true });
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = resume.achievements.filter(project => project.id !== id);
    
    const updatedResume: Resume = {
      ...resume,
      achievements: updatedProjects,
    };
    
    onUpdate(updatedResume);
  };

  const handleUpdateProject = (id: string, updatedData: Partial<Achievement>) => {
    const updatedProjects = resume.achievements.map(project => {
      if (project.id === id) {
        return { ...project, ...updatedData };
      }
      return project;
    });
    
    const updatedResume: Resume = {
      ...resume,
      achievements: updatedProjects,
    };
    
    onUpdate(updatedResume);
  };

  const toggleEditMode = (id: string) => {
    setEditMode(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <p className="text-gray-600">
          Add your best projects to showcase your skills and work
        </p>
      </div>

      {resume.achievements.length === 0 ? (
        <div className="text-center p-10 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <Button onClick={handleAddProject}>
            <Plus className="h-4 w-4 mr-2" /> Add Project
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {resume.achievements.map((project) => (
            <Card key={project.id} className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {editMode[project.id] ? (
                      "Edit Project"
                    ) : (
                      project.title || "New Project"
                    )}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleEditMode(project.id)}
                    >
                      {editMode[project.id] ? "Done" : "Edit"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {editMode[project.id] ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                        <Input
                          id={`title-${project.id}`}
                          value={project.title}
                          onChange={(e) => handleUpdateProject(project.id, { title: e.target.value })}
                          placeholder="e.g. Personal Portfolio Website"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`date-${project.id}`}>Completion Date</Label>
                        <Input
                          id={`date-${project.id}`}
                          type="date"
                          value={project.date || ""}
                          onChange={(e) => handleUpdateProject(project.id, { date: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${project.id}`}>Description</Label>
                      <Textarea
                        id={`description-${project.id}`}
                        value={project.description || ""}
                        onChange={(e) => handleUpdateProject(project.id, { description: e.target.value })}
                        placeholder="Describe the project, technologies used, and your role..."
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {project.date && (
                      <p className="text-sm text-gray-600">
                        {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </p>
                    )}
                    
                    {project.description && (
                      <p className="text-sm mt-2">{project.description}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleAddProject}
              className="transition-all duration-300 hover:shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 