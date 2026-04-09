import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('⚠️  Supabase env vars missing — running in offline mode');
}

export const supabase = createClient(
  SUPABASE_URL  || 'https://placeholder.supabase.co',
  SUPABASE_KEY  || 'placeholder',
);

/* ── Auth helpers ── */
export async function signUp(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { username } },
  });
  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/* ── Progress helpers ── */
export async function loadProgress(userId) {
  const { data, error } = await supabase
    .from('game_progress')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
}

export async function saveProgress(userId, progress) {
  const { error } = await supabase
    .from('game_progress')
    .upsert({ user_id: userId, ...progress, updated_at: new Date().toISOString() });
  return { error };
}

export async function loadProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
}

export async function updateStreak(userId, streak, lastActiveDate) {
  const { error } = await supabase
    .from('game_progress')
    .upsert({ user_id: userId, streak, last_active_date: lastActiveDate, updated_at: new Date().toISOString() });
  return { error };
}

/* ── Leaderboard ── */
export async function getLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from('leaderboard_view')
    .select('*')
    .order('xp', { ascending: false })
    .limit(limit);
  return { data, error };
}
