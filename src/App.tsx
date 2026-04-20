import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, TrendingUp, History, Settings, Flame, Clock, Trophy, Dumbbell, User, Bell, Share2, ChevronLeft } from 'lucide-react';
import { HIIT_EXERCISES, WORKOUT_ROUTINES } from './data/exercises';
import { WorkoutSession, Exercise } from './types';
import WorkoutPlayer from './components/WorkoutPlayer';
import ExerciseList from './components/ExerciseList';
import { cn, formatTime } from './lib/utils';
import { MuscleGroup } from './types';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'workout' | 'summary' | 'history' | 'exercise-list'>('home');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | null>(null);
  const [selectedRoutine, setSelectedRoutine] = useState<typeof WORKOUT_ROUTINES[0] | null>(null);
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [lastSession, setLastSession] = useState<WorkoutSession | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('workout_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveSession = (session: WorkoutSession) => {
    const newHistory = [session, ...history];
    setHistory(newHistory);
    localStorage.setItem('workout_history', JSON.stringify(newHistory));
    setLastSession(session);
    setCurrentScreen('summary');
  };

  const startRoutine = (routine: typeof WORKOUT_ROUTINES[0]) => {
    setSelectedRoutine(routine);
    setCurrentScreen('workout');
  };

  const stats = history.reduce(
    (acc, s) => ({
      totalTime: acc.totalTime + s.duration,
      totalCals: acc.totalCals + s.calories,
      totalWorkouts: acc.totalWorkouts + 1
    }),
    { totalTime: 0, totalCals: 0, totalWorkouts: 0 }
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#E5E5E5] font-sans selection:bg-[#FF4D00]/30 overflow-x-hidden pb-10">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24"
          >
            {/* Header */}
            <header className="p-6 pt-12 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 accent-bg-orange rounded-full flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-orange-600/20">H</div>
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tighter uppercase leading-none">HIIT <span className="accent-orange">VIỆT</span></h1>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Phiên bản Cá nhân hóa Premium</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Người tập</p>
                  <p className="text-sm font-bold">Minh Trần</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-700 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/user/100/100" alt="avatar" />
                </div>
              </div>
            </header>

            {/* Stats Overview */}
            <section className="px-6 mb-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-[2rem]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-600/10 flex items-center justify-center">
                      <Flame className="w-5 h-5 accent-orange" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Calories</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black accent-orange font-serif italic">{stats.totalCals}</span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">đã đốt</span>
                  </div>
                </div>
                <div className="glass-card p-6 rounded-[2rem]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Thời gian</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-blue-400 font-serif italic">{Math.floor(stats.totalTime / 60)}</span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">tổng phút</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Personalized Routines */}
            <section className="px-6 mb-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tighter uppercase italic serif accent-orange">Lộ trình hôm nay</h2>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1">Cá nhân hóa cho bạn</p>
                </div>
                <button className="text-[10px] font-black text-white hover:accent-orange uppercase tracking-widest border-b border-orange-600/50 pb-1">Xem tất cả</button>
              </div>
              <div className="space-y-6">
                {WORKOUT_ROUTINES.map((routine) => (
                  <motion.div
                    key={routine.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startRoutine(routine)}
                    className="glass-card rounded-[2.5rem] p-8 cursor-pointer relative overflow-hidden group border-white/10"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div className="p-4 accent-bg-orange rounded-2xl shadow-xl shadow-orange-600/20 group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-black text-black" />
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">
                          <TrendingUp className="w-3.5 h-3.5 accent-orange" />
                          <span>{Math.ceil(routine.exercises.length * 40 / 60)} Phút • HIIT</span>
                        </div>
                      </div>
                      <h3 className="text-4xl font-extrabold leading-none mb-3 uppercase italic font-serif tracking-tighter">{routine.name}</h3>
                      <p className="text-zinc-400 text-sm font-medium line-clamp-2 max-w-sm">{routine.description}</p>
                    </div>
                    {/* Visual Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-600/10 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Muscle Groups */}
            <section className="px-6">
              <h2 className="text-xl font-bold italic tracking-tight mb-6">BÀI TẬP BỔ TRỢ</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {(['Cơ bụng', 'Chân & Mông', 'Tay & Vai', 'Toàn thân', 'Giãn cơ'] as MuscleGroup[]).map((group) => (
                  <div 
                    key={group} 
                    onClick={() => {
                      setSelectedMuscleGroup(group);
                      setCurrentScreen('exercise-list');
                    }}
                    className="flex-shrink-0 w-44 h-48 bg-neutral-900 border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between hover:bg-neutral-800 transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-neutral-800/50 rounded-2xl flex items-center justify-center border border-white/5 text-neutral-400 group-hover:text-white">
                      <Dumbbell className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm leading-tight uppercase italic tracking-tighter">{group}</h4>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase mt-2 tracking-widest italic">{HIIT_EXERCISES.filter(ex => ex.muscleGroup === group).length} Động tác</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Lower Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-3xl border-t border-zinc-800 px-8 pt-4 pb-12 flex justify-between items-center z-40">
              <button 
                onClick={() => setCurrentScreen('home')} 
                className={cn("p-2 transition-all", currentScreen === 'home' ? "accent-orange scale-110" : "text-zinc-500 hover:text-white")}
              >
                <Play className="w-7 h-7 fill-current" />
              </button>
              <button 
                onClick={() => setCurrentScreen('history')} 
                className={cn("p-2 transition-all", currentScreen === 'history' ? "accent-orange scale-110" : "text-zinc-500 hover:text-white")}
              >
                <History className="w-7 h-7" />
              </button>
              <div className="relative">
                <button 
                  onClick={() => startRoutine(WORKOUT_ROUTINES[0])}
                  className="w-16 h-16 accent-bg-orange text-black rounded-full flex items-center justify-center -translate-y-10 shadow-2xl shadow-orange-600/40 active:scale-90 transition-all border-4 border-zinc-950"
                >
                  <Play className="w-8 h-8 fill-black ml-1" />
                </button>
              </div>
              <button className="p-2 text-zinc-500 hover:text-white">
                <Bell className="w-7 h-7" />
              </button>
              <button className="p-2 text-zinc-500 hover:text-white">
                <Settings className="w-7 h-7" />
              </button>
            </nav>
          </motion.div>
        )}

        {currentScreen === 'workout' && selectedRoutine && (
          <WorkoutPlayer
            exercises={selectedRoutine.exercises.map(id => HIIT_EXERCISES.find(e => e.id === id)!).filter(Boolean)}
            workDuration={30}
            restDuration={10}
            prepDuration={10}
            onFinish={saveSession}
            onCancel={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'summary' && lastSession && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center p-8 z-[100]"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-28 h-28 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center mb-10 shadow-3xl shadow-orange-500/30"
            >
              <Trophy className="w-14 h-14 text-white" />
            </motion.div>
            <h1 className="text-5xl font-black tracking-tighter mb-3 italic">XUẤT SẮC!</h1>
            <p className="text-neutral-500 font-bold mb-14 text-center decoration-orange-500/50 underline underline-offset-8 decoration-2">
              BẠN VỪA VƯỢT QUA GIỚI HẠN BẢN THÂN
            </p>

            <div className="grid grid-cols-2 gap-5 w-full max-w-sm mb-14">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] p-7 text-center border border-white/5">
                <span className="text-4xl font-black block mb-2 tracking-tighter">{lastSession.calories}</span>
                <span className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Kcal Đốt cháy</span>
              </div>
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] p-7 text-center border border-white/5">
                <span className="text-4xl font-black block mb-2 tracking-tighter">{Math.floor(lastSession.duration / 60)}:{(lastSession.duration % 60).toString().padStart(2, '0')}</span>
                <span className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Thời gian</span>
              </div>
            </div>

            <div className="flex gap-4 w-full max-w-sm">
              <button
                onClick={() => setCurrentScreen('home')}
                className="flex-1 py-5 bg-white text-black font-black rounded-2xl hover:bg-neutral-200 active:scale-95 transition-all shadow-xl shadow-white/5"
              >
                VỀ TRANG CHỦ
              </button>
              <button className="w-20 h-20 bg-neutral-900 rounded-2xl flex items-center justify-center border border-white/5 hover:bg-neutral-800 transition-colors">
                <Share2 className="w-7 h-7" />
              </button>
            </div>
          </motion.div>
        )}

        {currentScreen === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 pt-12 pb-32"
          >
            <div className="flex items-center gap-5 mb-10">
              <button onClick={() => setCurrentScreen('home')} className="p-3 bg-neutral-900 rounded-2xl border border-white/5">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-3xl font-black tracking-tighter italic uppercase">LỊCH SỬ</h1>
            </div>

            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-40 text-neutral-700">
                <div className="w-20 h-20 bg-neutral-900 rounded-3xl flex items-center justify-center mb-6 opacity-40">
                   <History className="w-10 h-10" />
                </div>
                <p className="font-black text-sm uppercase tracking-widest italic">Chưa có bài tập nào được ghi lại</p>
              </div>
            ) : (
              <div className="space-y-5">
                {history.map((session) => (
                  <div key={session.id} className="bg-neutral-900/50 backdrop-blur-xl rounded-[2.5rem] p-7 border border-white/10 group active:scale-98 transition-transform">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1 italic">
                          {new Date(session.date).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                        <h4 className="text-xl font-bold tracking-tight uppercase">Phiên tập HIIT</h4>
                      </div>
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/20">
                        <Trophy className="w-5 h-5 text-emerald-500" />
                      </div>
                    </div>
                    <div className="flex gap-8">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                          <Flame className="w-4 h-4 text-orange-500" />
                        </div>
                        <span className="font-black text-lg tracking-tighter">{session.calories}<span className="text-[10px] text-neutral-500 ml-1">kcal</span></span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="font-black text-lg tracking-tighter">{formatTime(session.duration)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
        {currentScreen === 'exercise-list' && selectedMuscleGroup && (
          <ExerciseList 
            muscleGroup={selectedMuscleGroup} 
            onBack={() => setCurrentScreen('home')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
