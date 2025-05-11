import { Resume } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, MapPin, Linkedin, Calendar, Award, Briefcase } from "lucide-react";

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const { personalDetails, education, experience, skills, achievements, templateId, id } = resume;
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short'
    }).format(date);
  };

  // Get template styles based on template ID
  const getTemplateStyles = () => {
    // Default styles (Modern-1)
    let headerBgClass = "bg-gradient-to-r from-indigo-600 to-violet-600";
    let accentBorderClass = "border-indigo-200";
    let sectionTitleClass = "text-indigo-700";
    let hasSidebar = false;
    let sidebarBgClass = "bg-slate-900";
    let sidebarWidth = "w-1/4";
    let mainWidth = "w-3/4";
    let badgeBgClass = "bg-gray-100";
    let badgeAccentClass = "bg-indigo-100";
    let projectsBorderClass = "border-amber-300";
    
    // Template-specific styles
    if (templateId?.startsWith('professional')) {
      // Gregory Walls - Professional template with dark sidebar
      headerBgClass = "bg-slate-900";
      accentBorderClass = "border-blue-300";
      sectionTitleClass = "text-blue-800";
      hasSidebar = true;
      sidebarBgClass = "bg-slate-900";
      badgeAccentClass = "bg-blue-100";
      projectsBorderClass = "border-blue-300";
    } 
    else if (templateId?.startsWith('creative-1')) {
      // Patricia Giordano - Creative template with pink header
      headerBgClass = "bg-pink-500";
      accentBorderClass = "border-purple-300";
      sectionTitleClass = "text-purple-700";
      badgeAccentClass = "bg-pink-100";
      projectsBorderClass = "border-pink-300";
    }
    else if (templateId?.startsWith('creative-2')) {
      // Sebastian Wilder - Creative with yellow sidebar
      headerBgClass = "bg-yellow-300";
      accentBorderClass = "border-rose-300";
      sectionTitleClass = "text-rose-700";
      hasSidebar = true;
      sidebarBgClass = "bg-yellow-300";
      badgeAccentClass = "bg-rose-100";
      projectsBorderClass = "border-yellow-500";
    }
    else if (templateId?.startsWith('simple')) {
      // Howard Jones - Simple template with minimal design
      headerBgClass = "bg-white border-b border-gray-200";
      accentBorderClass = "border-gray-200";
      sectionTitleClass = "text-gray-700";
      badgeAccentClass = "bg-green-100";
      projectsBorderClass = "border-gray-300";
    }
    else if (templateId?.startsWith('modern-2')) {
      // Sophie Wright - Modern template with indigo header
      headerBgClass = "bg-indigo-500";
      accentBorderClass = "border-indigo-300";
      sectionTitleClass = "text-indigo-600";
      badgeAccentClass = "bg-indigo-100";
      projectsBorderClass = "border-indigo-300";
    }
    
    return {
      headerBgClass,
      accentBorderClass,
      sectionTitleClass,
      hasSidebar,
      sidebarBgClass,
      sidebarWidth,
      mainWidth,
      badgeBgClass,
      badgeAccentClass,
      projectsBorderClass
    };
  };
  
  const styles = getTemplateStyles();

  // Template layout based on template type
  if (styles.hasSidebar) {
    // Sidebar layout (Professional or Creative-2)
    return (
      <Card className="bg-white shadow-md h-[700px] overflow-auto" id={`resume-preview-${id}`} style={{ minHeight: "700px" }}>
        <div className="flex flex-row h-full">
          {/* Sidebar */}
          <div className={`${styles.sidebarBgClass} p-4 text-white ${styles.sidebarWidth} h-full`}>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-20 w-20 border-2 border-white mb-2">
                {personalDetails.photo ? (
                  <AvatarImage src={personalDetails.photo} alt={personalDetails.fullName} />
                ) : (
                  <AvatarFallback className="bg-gray-300 text-gray-700 flex items-center justify-center font-bold">
                    {personalDetails.fullName ? getInitials(personalDetails.fullName) : 'N/A'}
                  </AvatarFallback>
                )}
              </Avatar>
              <h2 className="text-lg font-bold text-center mt-2">
                {personalDetails.fullName || 'Your Name'}
              </h2>
              {personalDetails.jobTitle && (
                <p className="text-xs opacity-80 text-center">{personalDetails.jobTitle}</p>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold mb-2 uppercase">Contact</h3>
                <div className="space-y-2 text-xs">
                  {personalDetails.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{personalDetails.email}</span>
                    </div>
                  )}
                  {personalDetails.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{personalDetails.phone}</span>
                    </div>
                  )}
                  {personalDetails.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{personalDetails.location}</span>
                    </div>
                  )}
                  {personalDetails.linkedIn && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{personalDetails.linkedIn}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {skills.length > 0 && templateId?.startsWith('professional') && (
                <div>
                  <h3 className="text-xs font-bold mb-2 uppercase">Skills</h3>
                  <div className="space-y-1">
                    {skills.map((skill, idx) => (
                      <div key={idx} className="text-xs">
                        <span className="font-medium">{skill.name}</span>
                        {skill.level && <span className="opacity-70 ml-1">({skill.level})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className={`${styles.mainWidth} p-5 overflow-auto`}>
            {personalDetails.summary && (
              <div className="mb-4">
                <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-1 uppercase`}>
                  Summary
                </h3>
                <p className="text-xs text-gray-700">{personalDetails.summary}</p>
              </div>
            )}
            
            {education.length > 0 && (
              <div className="mb-4">
                <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-2 uppercase`}>
                  Education
                </h3>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className={`border-l-2 ${styles.accentBorderClass} pl-3`}>
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-800 text-xs">{edu.degree}</p>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs">{edu.institution}</p>
                      {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
                      {edu.description && <p className="text-gray-600 mt-1 text-xs">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {experience.length > 0 && (
              <div className="mb-4">
                <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-2 uppercase`}>
                  Experience
                </h3>
                <div className="space-y-3">
                  {experience.map((exp, idx) => (
                    <div key={idx} className={`border-l-2 ${styles.accentBorderClass} pl-3`}>
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-800 text-xs">{exp.position}</p>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(exp.startDate)} - {exp.present ? "Present" : formatDate(exp.endDate)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-3 w-3 mr-1 text-gray-500" />
                        <p className="text-gray-600 text-xs">{exp.company}</p>
                      </div>
                      {exp.description && <p className="text-gray-600 mt-1 text-xs">{exp.description}</p>}
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-1">
                          <p className="text-gray-700 italic text-xs">Key Achievements:</p>
                          <ul className="list-disc list-inside text-gray-600 pl-2 text-xs">
                            {exp.achievements.map((ach, i) => (
                              <li key={i}>{ach}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {!templateId?.startsWith('professional') && skills.length > 0 && (
              <div className="mb-4">
                <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-2 uppercase`}>
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => {
                    let bgColor = styles.badgeBgClass;
                    if (skill.level === 'Expert' || skill.level === 'Advanced') bgColor = styles.badgeAccentClass;
                    
                    return (
                      <Badge key={idx} className={`${bgColor} text-gray-800 hover:${bgColor}`}>
                        {skill.name}
                        {skill.level && <span className="ml-1 opacity-70">({skill.level})</span>}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
            
            {achievements.length > 0 && (
              <div>
                <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-2 uppercase flex items-center`}>
                  <Award className="h-4 w-4 mr-1" />
                  Projects
                </h3>
                <div className="space-y-2">
                  {achievements.map((ach, idx) => (
                    <div key={idx} className={`border-l-2 ${styles.projectsBorderClass} pl-3`}>
                      <p className="font-medium text-gray-800 text-xs">{ach.title}</p>
                      {ach.date && <p className="text-gray-500 text-xs">{formatDate(ach.date)}</p>}
                      {ach.description && <p className="text-gray-600 mt-1 text-xs">{ach.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }
  
  // Standard header layout for other templates
  return (
    <Card className="bg-white shadow-md h-[700px] overflow-auto" id={`resume-preview-${id}`} style={{ minHeight: "700px" }}>
      <CardHeader className={`${styles.headerBgClass} ${templateId?.startsWith('simple') ? 'text-gray-800' : 'text-white'} pb-6 pt-6`}>
        <div className="flex items-start">
          <Avatar className="h-16 w-16 border-2 border-white mr-4">
            {personalDetails.photo ? (
              <AvatarImage src={personalDetails.photo} alt={personalDetails.fullName} />
            ) : (
              <AvatarFallback className="bg-gray-300 text-gray-700 flex items-center justify-center font-bold">
                {personalDetails.fullName ? getInitials(personalDetails.fullName) : 'N/A'}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <CardTitle className="text-xl mb-1 font-bold">
              {personalDetails.fullName || 'Your Name'}
            </CardTitle>
            <p className={`text-sm ${templateId?.startsWith('simple') ? 'text-gray-600' : 'text-white/90'} mb-3`}>
              {personalDetails.jobTitle || 'Professional Title'}
            </p>
            <div className="flex flex-wrap gap-2">
              {personalDetails.email && (
                <div className={`flex items-center text-xs ${templateId?.startsWith('simple') ? 'text-gray-600' : 'text-white/80'}`}>
                  <Mail className="h-3 w-3 mr-1" />
                  {personalDetails.email}
                </div>
              )}
              {personalDetails.phone && (
                <div className={`flex items-center text-xs ${templateId?.startsWith('simple') ? 'text-gray-600' : 'text-white/80'}`}>
                  <Phone className="h-3 w-3 mr-1" />
                  {personalDetails.phone}
                </div>
              )}
              {personalDetails.location && (
                <div className={`flex items-center text-xs ${templateId?.startsWith('simple') ? 'text-gray-600' : 'text-white/80'}`}>
                  <MapPin className="h-3 w-3 mr-1" />
                  {personalDetails.location}
                </div>
              )}
              {personalDetails.linkedIn && (
                <div className={`flex items-center text-xs ${templateId?.startsWith('simple') ? 'text-gray-600' : 'text-white/80'}`}>
                  <Linkedin className="h-3 w-3 mr-1" />
                  {personalDetails.linkedIn}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-xs space-y-4">
        {personalDetails.summary && (
          <div>
            <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-1 uppercase flex items-center`}>
              Summary
            </h3>
            <p className="text-gray-700">{personalDetails.summary}</p>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-2 uppercase flex items-center`}>
              Education
            </h3>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className={`border-l-2 ${styles.accentBorderClass} pl-3`}>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-800">{edu.degree}</p>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                    </div>
                  </div>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-500">GPA: {edu.gpa}</p>}
                  {edu.description && <p className="text-gray-600 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-2 uppercase flex items-center`}>
              Experience
            </h3>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={idx} className={`border-l-2 ${styles.accentBorderClass} pl-3`}>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-800">{exp.position}</p>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(exp.startDate)} - {exp.present ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-3 w-3 mr-1 text-gray-500" />
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  {exp.description && <p className="text-gray-600 mt-1">{exp.description}</p>}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mt-1">
                      <p className="text-gray-700 italic">Key Achievements:</p>
                      <ul className="list-disc list-inside text-gray-600 pl-2">
                        {exp.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If no experience, show "No Experience Yet" message with helpful tips */}
        {experience.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
            <h3 className="text-sm font-bold text-amber-700 mb-1 uppercase flex items-center">
              <Briefcase className="h-4 w-4 mr-1" />
              No Professional Experience Yet?
            </h3>
            <p className="text-amber-800 mb-2">That's okay! Consider adding:</p>
            <ul className="list-disc list-inside text-amber-700 pl-2 space-y-1">
              <li>Internships or volunteer work</li>
              <li>Academic or personal projects</li>
              <li>Part-time jobs (even if unrelated)</li>
              <li>Leadership positions in clubs/organizations</li>
            </ul>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-2 uppercase flex items-center`}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => {
                let bgColor = styles.badgeBgClass;
                if (skill.level === 'Expert' || skill.level === 'Advanced') bgColor = styles.badgeAccentClass;
                
                return (
                  <Badge key={idx} className={`${bgColor} text-gray-800 hover:${bgColor}`}>
                    {skill.name}
                    {skill.level && <span className="ml-1 opacity-70">({skill.level})</span>}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {achievements.length > 0 && (
          <div>
            <h3 className={`text-sm font-bold ${styles.sectionTitleClass} mb-2 uppercase flex items-center`}>
              <Award className="h-4 w-4 mr-1" />
              Projects
            </h3>
            <div className="space-y-2">
              {achievements.map((ach, idx) => (
                <div key={idx} className={`border-l-2 ${styles.projectsBorderClass} pl-3`}>
                  <p className="font-medium text-gray-800">{ach.title}</p>
                  {ach.date && <p className="text-gray-500 text-xs">{formatDate(ach.date)}</p>}
                  {ach.description && <p className="text-gray-600 mt-1">{ach.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
