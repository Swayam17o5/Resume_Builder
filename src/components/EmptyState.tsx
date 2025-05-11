import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg border-gray-300 bg-gray-50">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="mb-2 text-xl font-medium text-gray-900">{title}</h3>
      <p className="max-w-md mb-6 text-gray-500">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
} 