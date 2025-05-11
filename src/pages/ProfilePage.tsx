import { useAuth } from "@/contexts/AuthContext";
import { useStatistics } from "@/contexts/StatisticsContext";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, FileText, Download, Clock } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { statistics } = useStatistics();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      await updateProfile(user.id, { name });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">Profile</h1>
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              variant="outline"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="space-x-2">
              <Button 
                onClick={() => {
                  setIsEditing(false);
                  setName(user?.name || "");
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-600">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-4 flex-1">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="font-medium min-w-[4rem]">Name:</span>
                  {isEditing ? (
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="max-w-sm"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <span>{user?.name || "Not provided"}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-gray-700">
                  <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="font-medium min-w-[4rem]">Email:</span>
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader className="pb-4">
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Resumes Created</p>
                  <p className="text-2xl font-semibold">{statistics.totalResumes}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Downloads</p>
                  <p className="text-2xl font-semibold">{statistics.totalDownloads}</p>
                </div>
              </div>

              {statistics.lastCreated && (
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Resume Created</p>
                    <p className="text-lg font-medium">
                      {new Date(statistics.lastCreated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {statistics.lastDownloaded && (
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Download</p>
                    <p className="text-lg font-medium">
                      {new Date(statistics.lastDownloaded).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
