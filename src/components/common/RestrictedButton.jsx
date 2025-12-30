import React from 'react';
import { useCapabilities } from '../../auth/useCapabilities'; 
import { Lock } from 'lucide-react';

/**
 * 🛡️ RestrictedButton
 * UX Gating Component. 
 * Hides/Disables buttons based on role.
 */
export const RestrictedButton = ({ 
  action, 
  children, 
  fallback = null, 
  className = "", 
  disabled = false,
  ...props 
}) => {
  const { can } = useCapabilities();
  const allowed = can(action);

  if (!allowed) {
    if (fallback) return fallback;

    // Default fallback: A disabled, locked button (visible but unusable)
    return (
      <button disabled className={`opacity-50 cursor-not-allowed flex items-center gap-2 ${className}`} title="Access Denied">
        <Lock className="w-3 h-3" />
        {children}
      </button>
    );
  }

  // Render the actual button
  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
