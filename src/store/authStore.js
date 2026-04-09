import { create } from 'zustand';
import { supabase, signIn, signUp, signOut, loadProgress, saveProgress, loadProfile } from '../lib/supabase';
import { useGameStore } from './gameStore';

export const useAuthStore = create((set, get) => ({
  user:       null,   // supabase user object
  profile:    null,   // { username, avatar_url }
  loading:    true,   // initial auth check
  authScreen: 'login', // 'login' | 'register'

  /* ── Init: check existing session ── */
  init: async () => {
    set({ loading: true });
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await get().afterLogin(session.user);
    } else {
      set({ loading: false });
    }

    /* listen for auth changes */
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await get().afterLogin(session.user);
      } else {
        set({ user: null, profile: null, loading: false });
      }
    });
  },

  /* ── After successful login/register ── */
  afterLogin: async (user) => {
    set({ user, loading: true });

    /* load profile */
    const { data: profile } = await loadProfile(user.id);
    set({ profile });

    /* load game progress → hydrate gameStore */
    const { data: prog } = await loadProgress(user.id);
    if (prog) {
      useGameStore.setState({
        xp:              prog.xp              ?? 0,
        level:           prog.level           ?? 1,
        gems:            prog.gems            ?? 0,
        streak:          prog.streak          ?? 0,
        completedLevels: prog.completed_levels ?? [],
        levelStars:      prog.level_stars     ?? {},
        questDate:       prog.quest_date      ?? '',
        questProgress:   prog.quest_progress  ?? { lessons:0, xp:0, correct:0 },
        questDone:       prog.quest_done      ?? { lessons:false, xp:false, correct:false },
      });
    }

    /* check & update streak */
    await get().checkDailyStreak(user.id, prog);

    set({ loading: false });
  },

  /* ── Check if streak continues ── */
  checkDailyStreak: async (userId, prog) => {
    const today     = new Date().toDateString();
    const lastActive = prog?.last_active_date ?? '';

    if (lastActive === today) return; // already played today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const wasYesterday = lastActive === yesterday.toDateString();

    const currentStreak = useGameStore.getState().streak;
    const newStreak     = wasYesterday ? currentStreak + 1 : 1;

    useGameStore.setState({ streak: newStreak });
    await saveProgress(userId, {
      streak:            newStreak,
      last_active_date:  today,
    });
  },

  /* ── Login ── */
  login: async (email, password) => {
    const { data, error } = await signIn(email, password);
    if (error) return { error: error.message };
    return { error: null };
  },

  /* ── Register ── */
  register: async (email, password, username) => {
    const { data, error } = await signUp(email, password, username);
    if (error) return { error: error.message };
    return { error: null };
  },

  /* ── Logout ── */
  logout: async () => {
    await signOut();
    useGameStore.setState({
      xp:0, level:1, gems:0, streak:0,
      completedLevels:[], levelStars:{},
      screen:'subject',
    });
    set({ user: null, profile: null });
  },

  /* ── Save progress to Supabase ── */
  syncProgress: async () => {
    const user = get().user;
    if (!user) return;
    const s = useGameStore.getState();
    await saveProgress(user.id, {
      xp:               s.xp,
      level:            s.level,
      gems:             s.gems,
      streak:           s.streak,
      completed_levels: s.completedLevels,
      level_stars:      s.levelStars,
      quest_date:       s.questDate,
      quest_progress:   s.questProgress,
      quest_done:       s.questDone,
      last_active_date: new Date().toDateString(),
    });
  },

  setAuthScreen: (screen) => set({ authScreen: screen }),
}));
