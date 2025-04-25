import { create } from 'zustand';

interface TimerState {
  isRunning: boolean;
  isBreak: boolean;
  timeLeft: number;
  workDuration: number;
  breakDuration: number;
  timerId: ReturnType<typeof setInterval> | undefined;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setWorkDuration: (minutes: number) => void;
  setBreakDuration: (minutes: number) => void;
}

const updateDocumentTitle = (timeLeft: number, isBreak: boolean) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.title = `${isBreak ? 'Break' : 'Focus'} - ${formattedTime}`;
};

export const useTimerStore = create<TimerState>((set, get) => ({
  isRunning: false,
  isBreak: false,
  timeLeft: 25 * 60, // 25 minutes in seconds
  workDuration: 25,
  breakDuration: 5,
  timerId: undefined,
  
  startTimer: () => {
    const currentTimerId = get().timerId;
    if (currentTimerId !== undefined) {
      clearInterval(currentTimerId);
    }
    
    set({ isRunning: true });
    const timerId = setInterval(() => {
      const { timeLeft, isBreak, workDuration, breakDuration } = get();
      if (timeLeft > 0) {
        const newTimeLeft = timeLeft - 1;
        set({ timeLeft: newTimeLeft });
        updateDocumentTitle(newTimeLeft, isBreak);
      } else {
        clearInterval(timerId);
        const nextDuration = isBreak ? workDuration : breakDuration;
        const newState = {
          isBreak: !isBreak,
          timeLeft: nextDuration * 60,
          isRunning: false,
          timerId: undefined,
        };
        set(newState);
        updateDocumentTitle(newState.timeLeft, newState.isBreak);
      }
    }, 1000);
    
    set({ timerId });
    updateDocumentTitle(get().timeLeft, get().isBreak);
  },
  
  pauseTimer: () => {
    const { timerId } = get();
    if (timerId !== undefined) {
      clearInterval(timerId);
    }
    set({ isRunning: false, timerId: undefined });
    document.title = 'Pomodoro Timer';
  },
  
  resetTimer: () => {
    const { timerId } = get();
    if (timerId !== undefined) {
      clearInterval(timerId);
    }
    set({
      isRunning: false,
      timeLeft: get().workDuration * 60,
      isBreak: false,
      timerId: undefined,
    });
    document.title = 'Pomodoro Timer';
  },
  
  setWorkDuration: (minutes: number) => {
    set({ workDuration: minutes });
    if (!get().isRunning && !get().isBreak) {
      set({ timeLeft: minutes * 60 });
    }
  },
  
  setBreakDuration: (minutes: number) => {
    set({ breakDuration: minutes });
    if (!get().isRunning && get().isBreak) {
      set({ timeLeft: minutes * 60 });
    }
  },
})); 