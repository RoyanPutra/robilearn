-- ══════════════════════════════════════════════════════════
--  RobiLearn — Supabase Schema (FIXED v2)
--  Jalankan di: Supabase Dashboard → SQL Editor → Run
-- ══════════════════════════════════════════════════════════

-- ── Drop semua yang lama dulu ──
DROP TRIGGER  IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP VIEW     IF EXISTS leaderboard_view;

DROP POLICY IF EXISTS "profiles: read own"    ON profiles;
DROP POLICY IF EXISTS "profiles: update own"  ON profiles;
DROP POLICY IF EXISTS "profiles: public read" ON profiles;
DROP POLICY IF EXISTS "progress: read own"    ON game_progress;
DROP POLICY IF EXISTS "progress: upsert own"  ON game_progress;
DROP POLICY IF EXISTS "progress: update own"  ON game_progress;
DROP POLICY IF EXISTS "progress: public read" ON game_progress;

DROP TABLE IF EXISTS game_progress;
DROP TABLE IF EXISTS profiles;

-- ── 1. Tabel profiles ──
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT UNIQUE NOT NULL,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Tabel game_progress ──
CREATE TABLE game_progress (
  user_id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp               INTEGER     DEFAULT 0,
  level            INTEGER     DEFAULT 1,
  gems             INTEGER     DEFAULT 0,
  streak           INTEGER     DEFAULT 0,
  last_active_date TEXT        DEFAULT '',
  completed_levels JSONB       DEFAULT '[]',
  level_stars      JSONB       DEFAULT '{}',
  quest_date       TEXT        DEFAULT '',
  quest_progress   JSONB       DEFAULT '{"lessons":0,"xp":0,"correct":0}',
  quest_done       JSONB       DEFAULT '{"lessons":false,"xp":false,"correct":false}',
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. View leaderboard ──
CREATE VIEW leaderboard_view AS
  SELECT gp.user_id, p.username, gp.xp, gp.level, gp.streak
  FROM game_progress gp
  JOIN profiles p ON p.id = gp.user_id
  ORDER BY gp.xp DESC;

-- ── 4. Fungsi auto-create profile saat register ──
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.game_progress (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── 5. Trigger ──
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── 6. Aktifkan RLS ──
ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;

-- ── 7. Policy profiles ──
CREATE POLICY "profiles: read own"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles: update own"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles: public read"
  ON profiles FOR SELECT USING (true);

-- ── 8. Policy game_progress ──
CREATE POLICY "progress: read own"
  ON game_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "progress: upsert own"
  ON game_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "progress: update own"
  ON game_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "progress: public read"
  ON game_progress FOR SELECT USING (true);

-- ══════════════════════════════════════════════════════════
-- ✅ SELESAI! Coba daftar ulang sekarang.
-- ══════════════════════════════════════════════════════════
