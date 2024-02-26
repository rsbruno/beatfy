export interface MsToTimerProps {
  duration_ms: number;
  time: {
    minutes: number;
    seconds: number;
  };
}

export const msToSeconds = (timeInMs: number) => Math.trunc((timeInMs / 1000) % 60);

export const msToMinutes = (timeInMs: number) => Math.trunc(timeInMs / 1000 / 60);

export const msToTimer = (timeInMs: number): MsToTimerProps => ({
  duration_ms: timeInMs,
  time: {
    minutes: msToMinutes(timeInMs),
    seconds: msToSeconds(timeInMs),
  },
});
