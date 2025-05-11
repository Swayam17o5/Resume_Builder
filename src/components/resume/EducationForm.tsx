import { useState } from "react";
import { Resume, Education, EducationLevel } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { createEmptyEducation } from "@/utils/resumeUtils";

interface EducationFormProps {
  resume: Resume;
  onUpdate: (updatedResume: Resume) => void;
}

const EDUCATION_LEVELS: EducationLevel[] = ['SSC', 'HSC', 'Higher Degree'];

export function EducationForm({ resume, onUpdate }: EducationFormProps) {
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});

  const handleAddEducation = () => {
    const existingLevels = new Set(resume.education.map(edu => edu.level));
    const nextLevel = EDUCATION_LEVELS.find(level => !existingLevels.has(level));
    
    if (!nextLevel) {
      return; // All education levels are already added
    }
    
    const newEducation = createEmptyEducation(nextLevel);
    const updatedEducation = [...resume.education];
    
    // Find the correct position to insert based on EDUCATION_LEVELS order
    const insertIndex = EDUCATION_LEVELS.indexOf(nextLevel);
    updatedEducation.splice(insertIndex, 0, newEducation);
    
    const updatedResume: Resume = {
      ...resume,
      education: updatedEducation,
    };
    
    onUpdate(updatedResume);
    setEditMode({ ...editMode, [newEducation.id]: true });
  };

  const handleDeleteEducation = (id: string) => {
    const updatedEducation = resume.education.filter(edu => edu.id !== id);
    
    const updatedResume: Resume = {
      ...resume,
      education: updatedEducation,
    };
    
    onUpdate(updatedResume);
  };

  const handleUpdateEducation = (id: string, updatedData: Partial<Education>) => {
    const updatedEducation = resume.education.map(edu => {
      if (edu.id === id) {
        return { ...edu, ...updatedData };
      }
      return edu;
    });
    
    // Sort education entries by level order
    updatedEducation.sort((a, b) => 
      EDUCATION_LEVELS.indexOf(a.level) - EDUCATION_LEVELS.indexOf(b.level)
    );
    
    const updatedResume: Resume = {
      ...resume,
      education: updatedEducation,
    };
    
    onUpdate(updatedResume);
  };

  const toggleEditMode = (id: string) => {
    setEditMode(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Sort education entries by level order for display
  const sortedEducation = [...resume.education].sort(
    (a, b) => EDUCATION_LEVELS.indexOf(a.level) - EDUCATION_LEVELS.indexOf(b.level)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <p className="text-gray-600">
          Add your educational background in sequence: SSC, HSC, and Higher Degree
        </p>
      </div>

      {resume.education.length === 0 ? (
        <div className="text-center p-10 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">No education entries yet</p>
          <Button onClick={handleAddEducation}>
            <Plus className="h-4 w-4 mr-2" /> Add SSC Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedEducation.map((education) => (
            <Card key={education.id} className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {education.level} Education
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleEditMode(education.id)}
                    >
                      {editMode[education.id] ? "Save" : "Edit"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEducation(education.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editMode[education.id] ? (
                  <>
                    <div>
                      <Label>Institution</Label>
                      <Input
                        value={education.institution}
                        onChange={(e) =>
                          handleUpdateEducation(education.id, {
                            institution: e.target.value,
                          })
                        }
                        placeholder="Enter institution name"
                      />
                    </div>
                    <div>
                      <Label>Field of Study</Label>
                      <Input
                        value={education.fieldOfStudy || ""}
                        onChange={(e) =>
                          handleUpdateEducation(education.id, {
                            fieldOfStudy: e.target.value,
                          })
                        }
                        placeholder="Enter field of study"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={education.location || ""}
                        onChange={(e) =>
                          handleUpdateEducation(education.id, {
                            location: e.target.value,
                          })
                        }
                        placeholder="Enter location"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={education.startDate}
                          onChange={(e) =>
                            handleUpdateEducation(education.id, {
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={education.endDate || ""}
                          onChange={(e) =>
                            handleUpdateEducation(education.id, {
                              endDate: e.target.value,
                            })
                          }
                          disabled={education.present}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={education.present || false}
                        onCheckedChange={(checked) =>
                          handleUpdateEducation(education.id, {
                            present: checked,
                            endDate: checked ? undefined : education.endDate,
                          })
                        }
                      />
                      <Label>Currently Studying</Label>
                    </div>
                    <div>
                      <Label>GPA/Percentage</Label>
                      <Input
                        value={education.gpa || ""}
                        onChange={(e) =>
                          handleUpdateEducation(education.id, {
                            gpa: e.target.value,
                          })
                        }
                        placeholder="Enter GPA or percentage"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={education.description || ""}
                        onChange={(e) =>
                          handleUpdateEducation(education.id, {
                            description: e.target.value,
                          })
                        }
                        placeholder="Add additional details about your education"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <p><strong>Institution:</strong> {education.institution}</p>
                    {education.fieldOfStudy && (
                      <p><strong>Field of Study:</strong> {education.fieldOfStudy}</p>
                    )}
                    {education.location && (
                      <p><strong>Location:</strong> {education.location}</p>
                    )}
                    <p>
                      <strong>Duration:</strong>{" "}
                      {education.startDate} - {education.present ? "Present" : education.endDate}
                    </p>
                    {education.gpa && (
                      <p><strong>GPA/Percentage:</strong> {education.gpa}</p>
                    )}
                    {education.description && (
                      <p><strong>Description:</strong> {education.description}</p>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                {editMode[education.id] && (
                  <Button onClick={() => toggleEditMode(education.id)}>
                    Save Changes
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
          
          {resume.education.length < EDUCATION_LEVELS.length && (
            <div className="text-center">
              <Button onClick={handleAddEducation}>
                <Plus className="h-4 w-4 mr-2" /> 
                Add {EDUCATION_LEVELS[resume.education.length]} Education
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
