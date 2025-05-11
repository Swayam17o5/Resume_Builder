
import { useState } from "react";
import { Resume, Experience } from "@/types";
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
import { Switch } from "@/components/ui/switch";
import { Plus, X, Trash2 } from "lucide-react";
import { createEmptyExperience } from "@/utils/resumeUtils";

interface ExperienceFormProps {
  resume: Resume;
  onUpdate: (updatedResume: Resume) => void;
}

export function ExperienceForm({ resume, onUpdate }: ExperienceFormProps) {
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [newAchievement, setNewAchievement] = useState<Record<string, string>>({});

  const handleAddExperience = () => {
    const newExperience = createEmptyExperience();
    
    const updatedResume: Resume = {
      ...resume,
      experience: [...resume.experience, newExperience],
    };
    
    onUpdate(updatedResume);
    setEditMode({ ...editMode, [newExperience.id]: true });
  };

  const handleDeleteExperience = (id: string) => {
    const updatedExperience = resume.experience.filter(exp => exp.id !== id);
    
    const updatedResume: Resume = {
      ...resume,
      experience: updatedExperience,
    };
    
    onUpdate(updatedResume);
  };

  const handleUpdateExperience = (id: string, updatedData: Partial<Experience>) => {
    const updatedExperience = resume.experience.map(exp => {
      if (exp.id === id) {
        return { ...exp, ...updatedData };
      }
      return exp;
    });
    
    const updatedResume: Resume = {
      ...resume,
      experience: updatedExperience,
    };
    
    onUpdate(updatedResume);
  };

  const handleAddAchievement = (experienceId: string) => {
    const achievement = newAchievement[experienceId];
    if (!achievement || achievement.trim() === "") return;

    const experience = resume.experience.find(exp => exp.id === experienceId);
    if (!experience) return;

    const updatedAchievements = [...(experience.achievements || []), achievement];
    handleUpdateExperience(experienceId, { achievements: updatedAchievements });
    setNewAchievement({ ...newAchievement, [experienceId]: "" });
  };

  const handleDeleteAchievement = (experienceId: string, index: number) => {
    const experience = resume.experience.find(exp => exp.id === experienceId);
    if (!experience || !experience.achievements) return;

    const updatedAchievements = experience.achievements.filter((_, i) => i !== index);
    handleUpdateExperience(experienceId, { achievements: updatedAchievements });
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
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <p className="text-gray-600">
          Add your professional experience
        </p>
      </div>

      {resume.experience.length === 0 ? (
        <div className="text-center p-10 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">No work experience entries yet</p>
          <Button onClick={handleAddExperience}>
            <Plus className="h-4 w-4 mr-2" /> Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {resume.experience.map((experience) => (
            <Card key={experience.id} className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {editMode[experience.id] ? (
                      "Edit Experience"
                    ) : (
                      experience.position || "New Experience Entry"
                    )}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleEditMode(experience.id)}
                    >
                      {editMode[experience.id] ? "Done" : "Edit"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteExperience(experience.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {editMode[experience.id] ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${experience.id}`}>Company</Label>
                        <Input
                          id={`company-${experience.id}`}
                          value={experience.company}
                          onChange={(e) => handleUpdateExperience(experience.id, { company: e.target.value })}
                          placeholder="e.g. Acme Corporation"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`position-${experience.id}`}>Position</Label>
                        <Input
                          id={`position-${experience.id}`}
                          value={experience.position}
                          onChange={(e) => handleUpdateExperience(experience.id, { position: e.target.value })}
                          placeholder="e.g. Senior Software Engineer"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`location-${experience.id}`}>Location</Label>
                        <Input
                          id={`location-${experience.id}`}
                          value={experience.location || ""}
                          onChange={(e) => handleUpdateExperience(experience.id, { location: e.target.value })}
                          placeholder="e.g. San Francisco, CA"
                        />
                      </div>
                      
                      <div></div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${experience.id}`}
                          type="date"
                          value={experience.startDate}
                          onChange={(e) => handleUpdateExperience(experience.id, { startDate: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`present-${experience.id}`}
                              checked={experience.present || false}
                              onCheckedChange={(checked) => {
                                handleUpdateExperience(experience.id, { 
                                  present: checked,
                                  endDate: checked ? undefined : experience.endDate
                                });
                              }}
                            />
                            <Label htmlFor={`present-${experience.id}`} className="text-sm">
                              Present
                            </Label>
                          </div>
                        </div>
                        <Input
                          id={`endDate-${experience.id}`}
                          type="date"
                          value={experience.endDate || ""}
                          onChange={(e) => handleUpdateExperience(experience.id, { endDate: e.target.value })}
                          disabled={experience.present}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${experience.id}`}>Description</Label>
                      <Textarea
                        id={`description-${experience.id}`}
                        value={experience.description}
                        onChange={(e) => handleUpdateExperience(experience.id, { description: e.target.value })}
                        placeholder="Describe your responsibilities and accomplishments..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Key Achievements</Label>
                      
                      {experience.achievements && experience.achievements.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {experience.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center">
                              <div className="flex-grow p-2 bg-gray-50 rounded text-sm">
                                {achievement}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteAchievement(experience.id, index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a key achievement..."
                          value={newAchievement[experience.id] || ""}
                          onChange={(e) => setNewAchievement({
                            ...newAchievement,
                            [experience.id]: e.target.value
                          })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddAchievement(experience.id);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleAddAchievement(experience.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Press Enter or click + to add each achievement
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{experience.company}</p>
                        {experience.location && (
                          <p className="text-sm text-gray-600">{experience.location}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {experience.startDate && new Date(experience.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                          {" - "}
                          {experience.present 
                            ? "Present" 
                            : (experience.endDate 
                                ? new Date(experience.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                                : ""
                              )
                          }
                        </p>
                      </div>
                    </div>
                    
                    <p>{experience.description}</p>
                    
                    {experience.achievements && experience.achievements.length > 0 && (
                      <div className="mt-3">
                        <p className="font-medium mb-1">Key Achievements:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {experience.achievements.map((achievement, index) => (
                            <li key={index} className="text-sm">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleAddExperience}
              className="transition-all duration-300 hover:shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
