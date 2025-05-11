
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

export function PasswordRequirements({ password, className }: PasswordRequirementsProps) {
  const requirements = [
    {
      label: 'At least 8 characters',
      met: password.length >= 8
    },
    {
      label: 'At least 1 uppercase letter (A-Z)',
      met: /[A-Z]/.test(password)
    },
    {
      label: 'At least 1 lowercase letter (a-z)',
      met: /[a-z]/.test(password)
    },
    {
      label: 'At least 1 number (0-9)',
      met: /[0-9]/.test(password)
    },
    {
      label: 'At least 1 special character (e.g. !@#$%)',
      met: /[^A-Za-z0-9]/.test(password)
    }
  ];
  
  return (
    <div className={cn("mt-3", className)}>
      <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
      <ul className="space-y-1">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center text-sm">
            {req.met ? (
              <Check className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <X className="h-4 w-4 text-gray-400 mr-2" />
            )}
            <span className={cn(
              "transition-colors duration-200",
              req.met ? "text-gray-700" : "text-gray-500"
            )}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
