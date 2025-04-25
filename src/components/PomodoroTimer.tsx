import { useState, useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const PomodoroTimer = () => {
  const {
    isRunning,
    isBreak,
    timeLeft,
    workDuration,
    breakDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    setWorkDuration,
    setBreakDuration,
  } = useTimerStore();

  const [showSettings, setShowSettings] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  // Set initial title and handle cleanup
  useEffect(() => {
    document.title = 'Pomodoro Timer';
    return () => {
      document.title = 'Pomodoro Timer';
    };
  }, []);

  // Update title when timer state changes
  useEffect(() => {
    if (isRunning) {
      const formattedTime = `${formatTime(minutes)}:${formatTime(seconds)}`;
      document.title = `${isBreak ? 'Break' : 'Focus'} - ${formattedTime}`;
    } else {
      document.title = 'Pomodoro Timer';
    }
  }, [isRunning, isBreak, minutes, seconds]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-obsidian-surface rounded-lg p-8 max-w-md w-full shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </h1>
        
        <div className="text-6xl font-mono text-center mb-8">
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className="btn btn-primary flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <FaPause /> Pause
              </>
            ) : (
              <>
                <FaPlay /> Start
              </>
            )}
          </button>
          <button
            onClick={resetTimer}
            className="btn btn-secondary flex items-center gap-2"
          >
            <FaRedo /> Reset
          </button>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-obsidian-muted text-sm hover:text-obsidian-text transition-colors"
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>

        {showSettings && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm mb-2">Work Duration (minutes)</label>
              <input
                type="number"
                value={workDuration}
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className="w-full bg-obsidian-bg border border-obsidian-muted rounded px-3 py-2"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Break Duration (minutes)</label>
              <input
                type="number"
                value={breakDuration}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                className="w-full bg-obsidian-bg border border-obsidian-muted rounded px-3 py-2"
                min="1"
                max="30"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer; 