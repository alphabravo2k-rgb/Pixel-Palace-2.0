import React from 'react';
import { useSession } from '../../auth/useSession';
import { can } from '../../lib/permissions';
import { Lock } from 'lucide-react';

export const RestrictedButton = ({ action, resourceId, children, fallback = null, className = "", ...props }) => {
  const { session } = useSession();

  // 1. Check if user has the role-based permission
  const hasPermission = can(session?.role, action);

  if (!hasPermission) {
    if (fallback) return fallback;
    
    // Default fallback: A disabled, locked button (visible but unusable)
    return (
      <button disabled className={`opacity-50 cursor-not-allowed flex items-center gap-2 ${className}`} title="Access Denied">
        <Lock className="w-3 h-3" />
        {children}
      </button>
    );
  }

  // 2. Render the actual button
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
