let timer = null;
/**
 * Duration of the game (in minutes)
 */
const GAME_DURATION = 60;

/**
 * Start the timer of the duration of the game, resolving Promise once
 * timer ends.
 *
 * @returns Promise of the timer
 */
export const startTimer = () =>
	new Promise((resolve, reject) => {
		timer = setTimeout(resolve, GAME_DURATION * 60 * 1000);
	});

/**
 * Get remaining time left before Promise is resolved
 *
 * @returns {number|null} `null` if there's no timer, else remaining time in second
 */
export const getTimeLeft = () =>
	timer
		? Math.ceil((timer._idleStart + timer._idleTimeout - Date.now()) / 1000)
		: null;

export const stopTimer = () => {
	clearTimeout(timer);
};
