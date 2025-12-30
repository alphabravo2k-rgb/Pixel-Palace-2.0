import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { normalizeRole, ROLES } from '../lib/roles';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    isAuthenticated: false,
    user: null,
    role: ROLES.GUEST,
    loading: true
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: authSession } }) => {
      if (authSession?.user) hydrateUser(authSession.user);
      else setSession(prev => ({...prev, loading: false}));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, authSession) => {
      if (authSession?.user) hydrateUser(authSession.user);
      else setSession({ isAuthenticated: false, user: null, role: ROLES.GUEST, loading: false });
    });
    return () => subscription.unsubscribe();
  }, []);

  const hydrateUser = async (user) => {
    try {
      // Fetch role from the secure view we created
      const { data: profile } = await supabase
        .from('session_profiles')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();

      setSession({
        isAuthenticated: true,
        user: user,
        role: normalizeRole(profile?.role),
        loading: false
      });
    } catch (err) {
      console.error("Session Error:", err);
      setSession(prev => ({ ...prev, loading: false }));
    }
  };

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { success: !error, message: error?.message };
  };

  const logout = async () => await supabase.auth.signOut();

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
