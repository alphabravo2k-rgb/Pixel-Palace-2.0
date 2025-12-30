import { useState, useCallback } from 'react';
import { supabase } from '../supabase/client';
import { useSession } from '../auth/useSession';

export const useAdminConsole = () => {
  const { session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (rpcName, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      if (!session?.isAuthenticated) throw new Error("UNAUTHORIZED: Session invalid.");

      // 🛡️ AUTOMATIC INJECTION: Always send the admin's ID
      const payload = {
        p_admin_id: session.user.id,
        ...params
      };

      console.log(`[AdminConsole] Executing ${rpcName}`, payload);
      
      const { data, error: rpcError } = await supabase.rpc(rpcName, payload);

      if (rpcError) throw rpcError;

      // 🛡️ STANDARDIZED RESPONSE: Our SQL functions return { success: boolean, message: string }
      if (data && data.success === false) {
        throw new Error(data.message || "Operation denied by server logic.");
      }

      return { success: true, data };
    } catch (err) {
      console.error(`[AdminConsole] Error in ${rpcName}:`, err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [session]);

  return { execute, loading, error };
};
