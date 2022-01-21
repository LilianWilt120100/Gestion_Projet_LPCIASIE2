import { setScanCount } from "./qrcode";
import { startTimer } from "./timer";

document.getElementById("start-game-btn").onclick = (e) => {
	e.preventDefault();

	setScanCount(0);
	startTimer().then(() => {
		alert("Fin du game");
	});
};
