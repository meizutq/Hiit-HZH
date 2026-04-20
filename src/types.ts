export type MuscleGroup = 'Toàn thân' | 'Cơ bụng' | 'Chân & Mông' | 'Tay & Vai' | 'Tim mạch' | 'Giãn cơ';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  breathing: string;
  image: string;
  muscleGroup: MuscleGroup;
}

export interface WorkoutSession {
  id: string;
  date: string;
  duration: number;
  calories: number;
  exercisesCompleted: number;
}
