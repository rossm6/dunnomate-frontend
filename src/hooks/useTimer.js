import { useEffect, useState } from "react";

const useTimer = ({
  automatic = true,
  duration,
  unit = 1,
  interval = 1000,
}) => {
  const [timer, setTimer] = useState(duration); // seconds
  const [timerStarted, setTimerStarted] = useState(automatic);
  const [_pause, setPause] = useState(false);

  useEffect(() => {
    if (timerStarted && timer > 0 && !_pause) {
      const clearId = setTimeout(() => {
        setTimer(timer - unit);
      }, interval);

      return () => {
        clearInterval(clearId);
      };
    }
  }, [timerStarted, _pause, timer, setTimer, interval, unit]);

  const pause = () => setPause(true);
  const resume = () => setPause(false);
  const start = () => {
    if (!timerStarted) setTimerStarted(true);
  };

  return { timeRemaining: timer, pause, resume, start };
};

export default useTimer;