import { startTimer } from "./timer";

document.getElementById("start-game-btn").onclick = (e) => {
	e.preventDefault();
	startTimer().then(() => {
		alert("Fin du game");
	});
};
