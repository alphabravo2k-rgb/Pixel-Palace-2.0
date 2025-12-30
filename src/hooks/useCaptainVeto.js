import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabase/client';

export const useCaptainVeto = (match) => {
  const [vetoes, setVetoes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const matchId = match?.id;

  // 1. Live Data Sync
  useEffect(() => {
    if (!matchId) return;

    const fetchVetoes = async () => {
      const { data } = await supabase
        .from('match_vetoes')
        .select('*')
        .eq('match_id', matchId)
        .order('pick_order', { ascending: true });
      if (data) setVetoes(data);
    };

    fetchVetoes();

    const channel = supabase
      .channel(`veto-${matchId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'match_vetoes', 
        filter: `match_id=eq.${matchId}` 
      }, (payload) => {
        setVetoes(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [matchId]);

  // 2. Deterministic State Engine
  // Note: We mostly read state here. Writing happens via RPC in the component.
  const currentAction = match?.status === 'veto' ? 'BAN' : 'LOCKED'; // Simplified for safety

  const submitVeto = async (mapName, teamId) => {
    if (!matchId || !teamId) return;
    setLoading(true);
    try {
      const { error } = await supabase.rpc('api_submit_veto', {
        p_match_id: matchId,
        p_team_id: teamId,
        p_map_name: mapName,
        p_type: 'BAN' // Defaulting to BAN for now based on typical flow
      });
      if (error) throw error;
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { vetoes, currentAction, submitVeto, loading };
};
