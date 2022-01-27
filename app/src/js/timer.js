import Duration from "@icholy/duration";

let timer = null;
let startTime = null;
let endTime = null;
/**
 * Duration of the game
 */
const GAME_DURATION = Duration.minute;

/**
 * Start the timer of the duration of the game, resolving Promise once
 * timer ends.
 *
 * @returns Promise of the timer
 */
export const startTimer = () =>
  new Promise((resolve) => {
    startTime = new Date();
    endTime = null;
    timer = setTimeout(() => {
      stopTimer();
      resolve();
    }, GAME_DURATION);
  });

/**
 * Get remaining time left before Promise is resolved
 *
 * @returns {Duration} `null` if there's no timer, else remaining time
 */
export const getTimeLeft = () =>
  timer ? new Duration(new Date() - startTime) : null;

/**
 * Get the duration of the previous game
 *
 * @returns {Duration} `null` if the game is going on (or no game at all), else the game duration
 */
export const getTotalDuration = () =>
  startTime && endTime ? new Duration(endTime - startTime) : null;

/**
 * Stop the current timer
 */
export const stopTimer = () => {
  endTime = new Date();
  clearTimeout(timer);
};
