import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { getPlant } from "./plant";

/**
 * Ouvre la camera et scan le QR-code
 */
const startScan = async () => {
	BarcodeScanner.hideBackground();
	const result = await BarcodeScanner.startScan();
	if (result.hasContent) {
		const { application, payload } = result.content;

		if (application === "time2bee") {
			if (payload.type === "plant") {
				const plant = await getPlant(payload.id);
				console.log(plant);
				// TODO
			}
		} else {
			throw "Le QRcode scanné n'est pas valide";
		}
	} else {
		throw "Une erreur est survenue lors du scan du QRcode";
	}
};

/**
 * Demande la permissions pour ouvrir la camera
 * @returns
 */
const checkPermission = async () => {
	// check or request permission
	const status = await BarcodeScanner.checkPermission({ force: true });

	if (status.granted) {
		// the user granted permission
		return true;
	}

	return false;
};

/**
 * Demande à l'utilisateur s'il veut scanner un QRcode
 */
const askUser = async () => {
	await checkPermission();
	const c = confirm("Do you want to scan a barcode?");

	if (c) {
		startScan();
	}
};
