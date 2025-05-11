import { Template } from "@/types";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TemplateCardProps {
  template: Template;
  isSelected?: boolean;
  onSelect: (template: Template) => void;
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  // Get styles based on template category for visual distinctiveness
  const getTemplateStyle = (category: string) => {
    switch (category) {
      case 'Professional':
        return {
          headerBg: 'bg-blue-700',
          accentColor: 'border-blue-500',
          textColor: 'text-blue-800',
          sidebarBg: 'bg-slate-900',
          buttonColor: 'bg-blue-600 hover:bg-blue-700',
          fontClass: 'font-serif',
          layoutClass: 'flex flex-row',
          sectionBg: 'bg-gray-100'
        };
      case 'Creative':
        return {
          headerBg: 'bg-pink-500',
          accentColor: 'border-pink-400',
          textColor: 'text-pink-700',
          sidebarBg: 'bg-amber-300',
          buttonColor: 'bg-pink-500 hover:bg-pink-600',
          fontClass: 'font-sans',
          layoutClass: 'block',
          sectionBg: 'bg-white'
        };
      case 'Simple':
        return {
          headerBg: 'bg-gray-200',
          accentColor: 'border-gray-400',
          textColor: 'text-gray-800',
          sidebarBg: 'bg-white',
          buttonColor: 'bg-gray-600 hover:bg-gray-700',
          fontClass: 'font-serif',
          layoutClass: 'block',
          sectionBg: 'bg-white'
        };
      case 'Modern':
        return {
          headerBg: 'bg-indigo-600',
          accentColor: 'border-indigo-400',
          textColor: 'text-indigo-800',
          sidebarBg: 'bg-gray-100',
          buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
          fontClass: 'font-sans',
          layoutClass: 'flex flex-row',
          sectionBg: 'bg-gray-50'
        };
      default:
        return {
          headerBg: 'bg-violet-600',
          accentColor: 'border-violet-400',
          textColor: 'text-violet-800',
          sidebarBg: 'bg-gray-100',
          buttonColor: 'bg-violet-600 hover:bg-violet-700',
          fontClass: 'font-sans',
          layoutClass: 'block',
          sectionBg: 'bg-white'
        };
    }
  };

  const style = getTemplateStyle(template.category);

  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden",
        isSelected && "ring-2 ring-brand-500"
      )}
      onClick={() => onSelect(template)}
    >
      <div className="relative w-full h-[300px]">
        {/* Template Preview */}
        {template.category === 'Professional' && (
          <div className={`w-full h-full ${style.fontClass} relative`}>
            <div className={`absolute w-1/3 h-full left-0 top-0 ${style.sidebarBg}`}></div>
            <div className="absolute w-2/3 h-full right-0 top-0 bg-white p-3">
              <div className="text-center mb-4">
                <div className="font-bold text-lg">GREGORY WALLS</div>
                <div className="text-xs text-gray-600">CARPENTER</div>
              </div>
              <div className={`w-full h-1 ${style.headerBg} mb-3`}></div>
              <div className="text-xs">
                <div className="font-semibold mb-1">EXPERIENCE</div>
                <div className="border-l-2 border-gray-300 pl-2 mb-3">
                  <div className="font-medium">Senior Carpenter</div>
                  <div className="text-gray-500 text-[10px]">Company Name • 2018-Present</div>
                </div>
                <div className="font-semibold mb-1">EDUCATION</div>
                <div className="border-l-2 border-gray-300 pl-2">
                  <div className="font-medium">Bachelor's Degree</div>
                  <div className="text-gray-500 text-[10px]">University Name • 2012-2016</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {template.category === 'Modern' && (
          <div className={`w-full h-full ${style.fontClass} relative`}>
            <div className={`w-full h-24 ${style.headerBg}`}>
              <div className="absolute left-5 top-5 w-16 h-16 rounded-full bg-white overflow-hidden border-2 border-white">
                <div className="bg-gray-300 w-full h-full flex items-center justify-center text-lg font-bold">TW</div>
              </div>
              <div className="absolute right-5 top-5 text-white">
                <div className="font-bold text-lg">Travis Willis</div>
                <div className="text-sm">IT Manager</div>
              </div>
            </div>
            <div className="absolute top-28 left-0 right-0 px-5">
              <div className="text-xs">
                <div className="font-semibold mb-1 uppercase text-gray-500">Experience</div>
                <div className="mb-3">
                  <div className="font-medium">IT Manager at Company Inc.</div>
                  <div className="text-gray-500 text-[10px]">2018 - Present</div>
                </div>
                <div className="font-semibold mb-1 uppercase text-gray-500">Education</div>
                <div>
                  <div className="font-medium">Computer Science</div>
                  <div className="text-gray-500 text-[10px]">University Name • 2014-2018</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {template.category === 'Creative' && (
          <div className={`w-full h-full ${style.fontClass} relative`}>
            {template.id === 'creative-1' ? (
              <>
                <div className={`w-full h-20 ${style.headerBg} flex items-center px-4`}>
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                    <div className="bg-gray-300 w-full h-full flex items-center justify-center text-lg font-bold">PG</div>
                  </div>
                  <div className="text-white">
                    <div className="font-bold text-lg">Patricia Giordano</div>
                    <div className="text-sm">Receptionist</div>
                  </div>
                </div>
                <div className="p-4 mt-4">
                  <div className="mb-3">
                    <div className="font-semibold mb-1 uppercase text-xs">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      <span className={`${style.headerBg} text-white text-[10px] px-2 py-1 rounded-full`}>Customer Service</span>
                      <span className={`${style.headerBg} text-white text-[10px] px-2 py-1 rounded-full`}>MS Office</span>
                      <span className={`${style.headerBg} text-white text-[10px] px-2 py-1 rounded-full`}>Communication</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1 uppercase text-xs">Experience</div>
                    <div className="mb-2">
                      <div className="font-medium text-sm">Receptionist at XYZ Company</div>
                      <div className="text-gray-500 text-[10px]">2019 - Present</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex h-full">
                  <div className={`${style.sidebarBg} w-1/3 h-full p-4`}>
                    <div className="mb-4">
                      <div className="font-bold text-lg">SEBASTIAN</div>
                      <div className="font-bold text-lg">WILDER</div>
                      <div className="text-xs">Student</div>
                    </div>
                    <div className="text-[10px] mt-8">
                      <div className="font-bold uppercase mb-1">Contact</div>
                      <div>email@example.com</div>
                      <div>(555) 123-4567</div>
                    </div>
                  </div>
                  <div className="w-2/3 h-full p-4">
                    <div className="mb-3">
                      <div className="font-semibold uppercase text-xs mb-1">Profile</div>
                      <div className="text-[10px] text-gray-600">Hardworking student seeking employment...</div>
                    </div>
                    <div>
                      <div className="font-semibold uppercase text-xs mb-1">Education</div>
                      <div className="text-[10px]">
                        <div className="font-medium">Bachelor of Communications</div>
                        <div className="text-gray-500">New York University • 2020-2024</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {template.category === 'Simple' && (
          <div className={`w-full h-full ${style.fontClass} relative`}>
            <div className="p-5 text-center">
              <div className="font-bold text-lg uppercase mb-1">Howard Jones</div>
              <div className="text-xs text-gray-600 uppercase mb-4">Lawyer</div>
              <div className="flex justify-between text-[10px] mb-3">
                <span>555-123-7777</span>
                <span>howard@gmail.com</span>
              </div>
              <div className="w-full h-px bg-gray-300 mb-3"></div>
              <div className="text-xs text-left">
                <div className="font-semibold uppercase mb-1">Profile</div>
                <div className="text-[10px] text-gray-600 mb-3">Experienced and innovative Lawyer with a passion and dedication...</div>
                <div className="font-semibold uppercase mb-1">Employment History</div>
                <div className="mb-2">
                  <div className="font-medium">Lawyer, Madison and Fletcher Associates</div>
                  <div className="text-gray-500 text-[10px] flex justify-between">
                    <span>New York</span>
                    <span>Jan 2018 - Present</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-bold ${style.textColor}`}>{template.name}</h3>
            <p className="text-sm text-gray-500">{template.category}</p>
          </div>
          <Button 
            variant="default"
            size="sm"
            className={`${style.buttonColor} text-white`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }} 
          >
            Use
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
