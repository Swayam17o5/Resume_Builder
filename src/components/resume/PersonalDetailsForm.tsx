import { Resume } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import { useState, useRef } from "react";

interface PersonalDetailsFormProps {
  resume: Resume;
  onUpdate: (updatedResume: Resume) => void;
}

export function PersonalDetailsForm({ resume, onUpdate }: PersonalDetailsFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(resume.personalDetails.photo || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    const updatedResume: Resume = {
      ...resume,
      personalDetails: {
        ...resume.personalDetails,
        [name]: value,
      },
    };
    
    onUpdate(updatedResume);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const photoUrl = event.target.result.toString();
        setPhotoPreview(photoUrl);
        
        // Update resume with the photo
        const updatedResume: Resume = {
          ...resume,
          personalDetails: {
            ...resume.personalDetails,
            photo: photoUrl,
          },
        };
        
        onUpdate(updatedResume);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    const updatedResume: Resume = {
      ...resume,
      personalDetails: {
        ...resume.personalDetails,
        photo: undefined,
      },
    };
    
    onUpdate(updatedResume);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
        <p className="text-gray-600">
          Let's start with your basic information
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar className="h-24 w-24 cursor-pointer" onClick={triggerFileInput}>
            <AvatarImage src={photoPreview || undefined} alt="Profile" />
            <AvatarFallback className="bg-indigo-100 text-indigo-800 text-xl">
              {resume.personalDetails.fullName 
                ? resume.personalDetails.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
                : 'JP'}
            </AvatarFallback>
          </Avatar>
          
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handlePhotoUpload}
            ref={fileInputRef}
          />
          
          <div className="absolute -bottom-2 -right-2 flex space-x-1">
            <Button 
              type="button" 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8 rounded-full bg-indigo-100 hover:bg-indigo-200"
              onClick={triggerFileInput}
            >
              <Camera className="h-4 w-4 text-indigo-600" />
              <span className="sr-only">Upload photo</span>
            </Button>
            
            {photoPreview && (
              <Button 
                type="button" 
                size="icon" 
                variant="destructive" 
                className="h-8 w-8 rounded-full"
                onClick={handleRemovePhoto}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove photo</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={resume.personalDetails.fullName}
            onChange={handleChange}
            placeholder="e.g. John Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={resume.personalDetails.email}
            onChange={handleChange}
            placeholder="e.g. john.smith@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={resume.personalDetails.phone}
            onChange={handleChange}
            placeholder="e.g. (123) 456-7890"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={resume.personalDetails.address || ""}
            onChange={handleChange}
            placeholder="e.g. New York, NY"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedIn">LinkedIn URL</Label>
          <Input
            id="linkedIn"
            name="linkedIn"
            value={resume.personalDetails.linkedIn || ""}
            onChange={handleChange}
            placeholder="e.g. linkedin.com/in/johnsmith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">GitHub</Label>
          <Input
            id="website"
            name="website"
            value={resume.personalDetails.website || ""}
            onChange={handleChange}
            placeholder="e.g. github.com/username"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={resume.personalDetails.summary || ""}
          onChange={handleChange}
          placeholder="Write a brief summary of your professional background and key strengths..."
          rows={5}
        />
        <p className="text-sm text-gray-500">
          A compelling summary significantly improves your resume's effectiveness.
        </p>
      </div>
    </div>
  );
}
