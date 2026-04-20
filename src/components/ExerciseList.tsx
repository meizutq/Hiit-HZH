import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Wind, Dumbbell } from 'lucide-react';
import { HIIT_EXERCISES } from '../data/exercises';
import { MuscleGroup } from '../types';

import ImageWithFallback from './ImageWithFallback';

interface ExerciseListProps {
  muscleGroup: MuscleGroup;
  onBack: () => void;
}

export default function ExerciseList({ muscleGroup, onBack }: ExerciseListProps) {
  const filteredExercises = HIIT_EXERCISES.filter(ex => ex.muscleGroup === muscleGroup);

  return (
    <div className="fixed inset-0 bg-[#050505] z-[70] overflow-y-auto font-sans">
      <div className="p-6 pt-12 flex items-center gap-5 border-b border-zinc-800 sticky top-0 bg-[#050505]/80 backdrop-blur-3xl z-10">
        <button onClick={onBack} className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] italic mb-0.5">Hướng dẫn kỹ thuật</p>
          <h1 className="text-3xl font-extrabold tracking-tighter uppercase italic font-serif accent-orange">{muscleGroup}</h1>
        </div>
      </div>

      <div className="p-6 space-y-12">
        {filteredExercises.map((ex, idx) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-6"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-3xl border border-white/5 bg-white">
              <ImageWithFallback 
                src={ex.image} 
                alt={ex.name} 
                className="w-full h-72 object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-10">
                <span className="accent-bg-orange text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-4 shadow-xl">Bài tập hiệu quả</span>
                <h2 className="text-3xl font-extrabold tracking-tighter italic uppercase font-serif">{ex.name}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="glass-card p-7 rounded-[2rem] border-white/5 relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 accent-orange" />
                  </div>
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Thực hiện</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                  {ex.description}
                </p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              </div>
              <div className="glass-card p-7 rounded-[2rem] border-white/5 relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center">
                    <Wind className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Kỹ thuật thở</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-medium italic underline underline-offset-8 decoration-orange-500/30">
                  {ex.breathing}
                </p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
