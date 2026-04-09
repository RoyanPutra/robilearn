import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const QUEST_DEFS = [
  { id:'lessons', icon:'📚', label:'Selesaikan 1 Pelajaran', target:1,  reward:15 },
  { id:'xp',      icon:'⚡', label:'Kumpulkan 30 XP',        target:30, reward:10 },
  { id:'correct', icon:'✅', label:'Jawab 10 Soal Benar',    target:10, reward:20 },
];

export const useGameStore = create(
  persist(
    (set, get) => ({
      /* ── Stats ── */
      xp:0, level:1, gems:0, streak:0,
      hearts:3, maxHearts:3,

      /* ── Progress ── */
      completedLevels: [],
      levelStars:      {},

      /* ── Navigation ── */
      screen:    'subject',
      subjectId: null,
      diffKey:   null,
      stageId:   null,
      levelData: null,

      /* ── Lesson runtime ── */
      questions:  [],
      qIndex:     0,
      wrongCount: 0,
      xpEarned:   0,
      combo:      0,

      /* ── Daily Quest ── */
      questDate:     '',
      questProgress: { lessons:0, xp:0, correct:0 },
      questDone:     { lessons:false, xp:false, correct:false },

      /* ── Toast ── */
      toastMsg: '',

      /* ════ NAVIGATION ════ */
      goTo:        (screen)  => set({ screen }),
      pickSubject: (id)      => set({ subjectId:id, screen:'difficulty' }),
      pickDiff:    (dk)      => set({ diffKey:dk,   screen:'stageMap'   }),
      pickStage:   (id)      => set({ stageId:id,   screen:'stageDetail'}),
      goBack: () => {
        const map = { difficulty:'subject', stageMap:'difficulty', stageDetail:'stageMap', complete:'stageDetail' };
        const next = map[get().screen];
        if (next) set({ screen:next });
      },

      /* ════ STATS ════ */
      addXP: (n) => {
        const { xp, level, questProgress, questDone } = get();
        const newXp  = xp + n;
        let   newLvl = level;
        while (newXp >= newLvl * 100) newLvl++;
        const newQp = { ...questProgress, xp: questProgress.xp + n };
        set({ xp:newXp, level:newLvl, questProgress:newQp, xpEarned: get().xpEarned + n });
        get().checkQuests(newQp, questDone);
        if (newLvl > level) get().toast(`🎉 Naik Level ${newLvl}!`);
        get()._scheduleSync();
      },
      addGems:   (n) => { set(s => ({ gems: s.gems + n })); get()._scheduleSync(); },
      loseHeart: ()  => set(s => ({ hearts: Math.max(0, s.hearts - 1) })),

      /* ════ LESSON ════ */
      startLesson: (lvData, qs) => set({
        levelData:lvData, questions:qs, qIndex:0,
        wrongCount:0, xpEarned:0, combo:0, hearts:3, screen:'lesson',
      }),
      nextQ: () => {
        const { qIndex, questions } = get();
        if (qIndex + 1 >= questions.length) get().completeLesson();
        else set({ qIndex: qIndex + 1 });
      },
      incWrong: () => set(s => ({ wrongCount: s.wrongCount + 1, combo: 0 })),
      incCorrect: () => {
        const s = get();
        const newCombo = s.combo + 1;
        const newQp = { ...s.questProgress, correct: s.questProgress.correct + 1 };
        set({ combo: newCombo, questProgress: newQp });
        get().checkQuests(newQp, s.questDone);
        return newCombo;
      },

      /* ════ COMPLETE ════ */
      completeLesson: () => {
        const { levelData, wrongCount, completedLevels, levelStars, streak, questProgress, questDone } = get();
        const id    = levelData.id;
        const stars = wrongCount === 0 ? 3 : wrongCount <= 2 ? 2 : 1;
        const newQp = { ...questProgress, lessons: questProgress.lessons + 1 };
        set({
          completedLevels: completedLevels.includes(id) ? completedLevels : [...completedLevels, id],
          levelStars: { ...levelStars, [id]: Math.max(stars, levelStars[id] || 0) },
          streak: streak,
          questProgress: newQp,
          screen: 'complete',
        });
        get().checkQuests(newQp, questDone);
        get()._scheduleSync();
      },

      retryLesson: () => {
        const { levelData } = get();
        import('../data/questions.js').then(({ generateLesson }) => {
          get().startLesson(levelData, generateLesson(levelData));
        });
      },

      goHomeFromLesson: () => {
        const { stageId } = get();
        set({ hearts:3, screen: stageId ? 'stageDetail' : 'stageMap' });
      },

      /* ════ QUESTS ════ */
      initQuests: () => {
        const today = new Date().toDateString();
        if (get().questDate !== today) {
          set({
            questDate:     today,
            questProgress: { lessons:0, xp:0, correct:0 },
            questDone:     { lessons:false, xp:false, correct:false },
          });
        }
      },
      checkQuests: (progress, done) => {
        const newDone = { ...done };
        let bonusXp = 0;
        QUEST_DEFS.forEach(q => {
          if (!done[q.id] && progress[q.id] >= q.target) {
            newDone[q.id] = true;
            bonusXp += q.reward;
          }
        });
        if (bonusXp > 0) {
          set(s => ({ questDone:newDone, xp: s.xp + bonusXp }));
          get().toast(`🎯 Misi selesai! +${bonusXp} XP`);
        } else {
          set({ questDone:newDone });
        }
      },

      /* ════ TOAST ════ */
      toast:      (msg) => { set({ toastMsg:msg }); setTimeout(() => set({ toastMsg:'' }), 2500); },
      clearToast: ()    => set({ toastMsg:'' }),

      /* ════ SYNC TRIGGER ════ */
      /* debounced — calls authStore.syncProgress after 3s of inactivity */
      _syncTimer: null,
      _scheduleSync: () => {
        clearTimeout(get()._syncTimer);
        const t = setTimeout(async () => {
          try {
            const { useAuthStore } = await import('./authStore.js');
            await useAuthStore.getState().syncProgress();
          } catch (_) {}
        }, 3000);
        set({ _syncTimer: t });
      },
    }),
    {
      name: 'robilearn-v7',
      partialize: s => ({
        xp:s.xp, level:s.level, gems:s.gems, streak:s.streak,
        completedLevels:s.completedLevels, levelStars:s.levelStars,
        questDate:s.questDate, questProgress:s.questProgress, questDone:s.questDone,
      }),
    }
  )
);
