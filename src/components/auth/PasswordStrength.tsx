
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const getPasswordStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Character types
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return Math.min(strength, 5);
  };
  
  const strength = getPasswordStrength(password);
  const percentage = (strength / 5) * 100;
  
  const getStrengthLabel = (strength: number): string => {
    if (strength === 0) return 'Very Weak';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    if (strength === 4) return 'Strong';
    return 'Very Strong';
  };
  
  const getStrengthColor = (strength: number): string => {
    if (strength <= 1) return 'bg-red-500';
    if (strength === 2) return 'bg-orange-500';
    if (strength === 3) return 'bg-yellow-500';
    if (strength === 4) return 'bg-green-500';
    return 'bg-brand-600';
  };
  
  return (
    <div className={cn("mt-2", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">Password Strength</span>
        <span className="text-xs font-medium">{getStrengthLabel(strength)}</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-300", getStrengthColor(strength))} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
