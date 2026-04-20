import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, ChevronLeft, Timer, Flame, Dumbbell, Wind, Volume2, VolumeX, CheckCircle } from 'lucide-react';
import { Exercise, WorkoutSession } from '../types';
import { cn, formatTime } from '../lib/utils';

import ImageWithFallback from './ImageWithFallback';

interface WorkoutPlayerProps {
  exercises: Exercise[];
  workDuration: number;
  restDuration: number;
  prepDuration: number;
  onFinish: (session: WorkoutSession) => void;
  onCancel: () => void;
}

type WorkoutState = 'preparing' | 'working' | 'resting' | 'finished';

export default function WorkoutPlayer({
  exercises,
  workDuration,
  restDuration,
  prepDuration,
  onFinish,
  onCancel
}: WorkoutPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<WorkoutState>('preparing');
  const [timeLeft, setTimeLeft] = useState(prepDuration);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [startTime] = useState(Date.now());

  const currentExercise = exercises[currentIndex];
  const nextExercise = exercises[currentIndex + 1];

  const playSound = useCallback((type: 'tick' | 'start' | 'rest' | 'complete') => {
    if (isMuted) return;
    // Real implementation would use audio files, for now we simulate or use notification sounds
    console.log(`Sound: ${type}`);
  }, [isMuted]);

  useEffect(() => {
    if (isPaused || state === 'finished') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleNextState();
          return 0;
        }
        if (prev <= 4) playSound('tick');
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state, currentIndex, isPaused, playSound]);

  const handleNextState = () => {
    if (state === 'preparing') {
      setState('working');
      setTimeLeft(workDuration);
      playSound('start');
    } else if (state === 'working') {
      if (currentIndex === exercises.length - 1) {
        finishWorkout();
      } else {
        setState('resting');
        setTimeLeft(restDuration);
        playSound('rest');
      }
    } else if (state === 'resting') {
      setCurrentIndex((prev) => prev + 1);
      setState('preparing');
      setTimeLeft(prepDuration);
    }
  };

  const finishWorkout = () => {
    setState('finished');
    playSound('complete');
    const duration = Math.floor((Date.now() - startTime) / 1000);
    onFinish({
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      duration,
      calories: Math.floor(duration * 0.2), // Rough estimate
      exercisesCompleted: exercises.length
    });
  };

  const progress = state === 'working'
    ? (1 - timeLeft / workDuration) * 100
    : state === 'resting'
      ? (1 - timeLeft / restDuration) * 100
      : (1 - timeLeft / prepDuration) * 100;

  return (
    <div className="fixed inset-0 bg-[#050505] text-[#E5E5E5] flex flex-col z-50 font-sans">
      {/* Header */}
      <div className="p-6 pt-12 flex items-center justify-between">
        <button onClick={onCancel} className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Bài tập {currentIndex + 1} / {exercises.length}
          </span>
          <h2 className="font-extrabold text-xl uppercase italic serif accent-orange tracking-tight">{exercises[currentIndex].name}</h2>
        </div>
        <button onClick={() => setIsMuted(!isMuted)} className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-colors">
          {isMuted ? <VolumeX className="w-6 h-6 text-red-500" /> : <Volume2 className="w-6 h-6 accent-orange" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <AnimatePresence mode="wait">
          {/* Main Stage: Image Layer */}
          <motion.div
            key={`img-${currentIndex}-${state}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 flex items-center justify-center p-4"
          >
            <div className="w-full h-full max-w-4xl max-h-[60vh] relative rounded-[3rem] overflow-hidden group">
              <ImageWithFallback
                src={state === 'working' ? currentExercise.image : (state === 'preparing' ? currentExercise.image : (nextExercise?.image || currentExercise.image))}
                alt={currentExercise.name}
                className={cn(
                  "w-full h-full object-contain transition-transform duration-700",
                  state === 'working' ? "scale-105" : "scale-100 grayscale opacity-40 blur-[2px]"
                )}
              />
              {/* Subtle Atmospheric Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Timer UI: Transparent Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* State Label */}
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.4em] mb-8 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-2xl",
              state === 'working' ? "accent-orange" : state === 'resting' ? "text-blue-500" : "text-emerald-500"
            )}
          >
            {state === 'working' ? 'VÀO HIỆP' : state === 'resting' ? 'NGHỈ NGƠI' : 'CHUẨN BỊ'}
          </motion.div>

          {/* Timer Circle */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 absolute inset-0 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <circle
                cx="144"
                cy="144"
                r="132"
                fill="transparent"
                stroke="white"
                strokeOpacity="0.05"
                strokeWidth="4"
              />
              <motion.circle
                cx="144"
                cy="144"
                r="132"
                fill="transparent"
                stroke={state === 'working' ? "#FF4D00" : state === 'resting' ? "#3b82f6" : "#10b981"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 132}
                initial={{ strokeDashoffset: 2 * Math.PI * 132 }}
                animate={{ strokeDashoffset: (2 * Math.PI * 132) * (1 - progress / 100) }}
                transition={{ ease: "linear", duration: 1 }}
              />
            </svg>
            
            {/* The Countdown Digits - Fully transparent with strong contrast shadow for readability */}
            <div className="flex flex-col items-center justify-center w-full h-full rounded-full">
              <span className="text-[160px] font-black tabular-nums tracking-tighter serif italic accent-orange timer-glow leading-none select-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                {timeLeft}
              </span>
            </div>
          </div>
        </div>

        {/* Breathing Instructions / Next Exercise Info Floating Footer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${state}-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="absolute bottom-4 left-6 right-6 z-20"
          >
            <div className="glass-card rounded-[2rem] p-6 border border-white/10 shadow-2xl overflow-hidden relative">
              {state === 'working' ? (
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Wind className="w-6 h-6 accent-orange" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF4D00]">Nhịp thở đề xuất</h4>
                    <p className="text-sm text-zinc-300 leading-snug font-medium italic">
                      {currentExercise.breathing}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      {state === 'preparing' ? 'Bắt đầu với:' : 'Tiếp theo:'}
                    </h4>
                    <p className="text-lg font-bold uppercase italic serif accent-orange leading-none mt-1">
                      {state === 'preparing' ? currentExercise.name : (nextExercise?.name || 'Về đích!')}
                    </p>
                  </div>
                </div>
              )}
              {/* Background gradient for the info card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="p-8 pb-14 flex justify-center items-center gap-6">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-2xl shadow-white/10 hover:scale-105 active:scale-95 transition-all"
        >
          {isPaused ? <Play className="w-8 h-8 fill-black" /> : <div className="flex gap-2"><div className="w-2 h-8 bg-black rounded-full" /><div className="w-2 h-8 bg-black rounded-full" /></div>}
        </button>
        <button 
           onClick={handleNextState}
           className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold border border-zinc-800 hover:bg-zinc-800 transition-colors uppercase tracking-widest text-xs"
        >
          Bỏ qua
        </button>
      </div>
    </div>
  );
}
