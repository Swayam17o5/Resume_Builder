import { useState } from "react";
import { Resume, Skill } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { createEmptySkill } from "@/utils/resumeUtils";
import { toast } from "@/components/ui/use-toast";

interface SkillsFormProps {
  resume: Resume;
  onUpdate: (updatedResume: Resume) => void;
}

export function SkillsForm({ resume, onUpdate }: SkillsFormProps) {
  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const handleAddSkill = () => {
    const newSkill = createEmptySkill();
    
    const updatedResume: Resume = {
      ...resume,
      skills: [...resume.skills, newSkill],
    };
    
    onUpdate(updatedResume);
  };

  const handleDeleteSkill = (id: string) => {
    const updatedSkills = resume.skills.filter(skill => skill.id !== id);
    
    const updatedResume: Resume = {
      ...resume,
      skills: updatedSkills,
    };
    
    onUpdate(updatedResume);
  };

  const handleUpdateSkill = (id: string, updatedData: Partial<Skill>) => {
    try {
      const updatedSkills = resume.skills.map(skill => {
        if (skill.id === id) {
          return { ...skill, ...updatedData };
        }
        return skill;
      });
      
      const updatedResume: Resume = {
        ...resume,
        skills: updatedSkills,
      };
      
      // Always update the resume state
      onUpdate(updatedResume);
      
    } catch (error) {
      console.error('Failed to update skill:', error);
      toast({
        title: "Error",
        description: "Failed to update skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <p className="text-gray-600">
          Add your professional skills and competencies
        </p>
      </div>

      <div className="space-y-4">
        {resume.skills.length === 0 ? (
          <div className="text-center p-10 border border-dashed rounded-lg">
            <p className="text-gray-500 mb-4">No skills added yet</p>
            <Button onClick={handleAddSkill}>
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resume.skills.map((skill) => (
              <Card key={skill.id} className="transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-grow space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor={`skill-${skill.id}`} className="text-sm">Skill</Label>
                        <Input
                          id={`skill-${skill.id}`}
                          value={skill.name}
                          onChange={(e) => handleUpdateSkill(skill.id, { name: e.target.value })}
                          placeholder="e.g. JavaScript"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor={`level-${skill.id}`} className="text-sm">Level</Label>
                        <Select
                          value={skill.level || "Beginner"}
                          onValueChange={(value) => 
                            handleUpdateSkill(skill.id, { 
                              level: value as "Beginner" | "Intermediate" | "Advanced" | "Expert" 
                            })
                          }
                        >
                          <SelectTrigger id={`level-${skill.id}`}>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {skillLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 self-start mt-7"
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={handleAddSkill}
            className="transition-all duration-300 hover:shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Skill
          </Button>
        </div>
      </div>
    </div>
  );
}
