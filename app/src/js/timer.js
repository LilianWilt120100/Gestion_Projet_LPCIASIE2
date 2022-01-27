let timer = null;
let startTime = null;
let endTime = null;
/**
 * Duration of the game (in minutes)
 */
const GAME_DURATION = 1;
const GAME_DURATION_MS = GAME_DURATION * 60 * 1000;

/**
 * Start the timer of the duration of the game, resolving Promise once
 * timer ends.
 *
 * @returns Promise of the timer
 */
export const startTimer = () =>
  new Promise((resolve) => {
    timer = setTimeout(() => {
      stopTimer();
      resolve();
    }, GAME_DURATION_MS);
    startTime = Date.now();
    endTime = null;
  });

/**
 * Get remaining time left before Promise is resolved
 *
 * @returns {number|null} `null` if there's no timer, else remaining time in second
 */
export const getTimeLeft = () =>
  timer ? Math.ceil((Date.now() - startTime) / 1000) : null;

/**
 * Get the duration of the previous game
 * @returns {number|null} `null` if the game is going on (or no game at all), else the game duration in second
 */
export const getTotalDuration = () =>
  startTime && endTime ? (endTime - startTime) / 100 : null;

/**
 * Stop the current timer
 */
export const stopTimer = () => {
  clearTimeout(timer);
  endTime = Date.now();
};
