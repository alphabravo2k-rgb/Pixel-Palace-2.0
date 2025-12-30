import { useCallback } from 'react';
import { useSession } from './useSession';
import { can as checkPermission } from '../lib/permissions';

export const useCapabilities = () => {
  const { session } = useSession();

  /**
   * CHECK PERMISSION (The Core Function)
   * Wraps the centralized RBAC logic from src/lib/permissions.js
   */
  const can = useCallback((capability) => {
    // Pass session.role to the helper logic
    return checkPermission(session?.role, capability);
  }, [session]);

  return { can };
};
