import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { getPlant } from "./plant";

let scanCount = 0;

/**
 * Ouvre la camera et scan le QR-code
 */
export const startScan = async () => {
	BarcodeScanner.hideBackground();
	const result = await BarcodeScanner.startScan();
	if (result.hasContent) {
		const { application, payload } = result.content;

		if (application === "time2bee") {
			if (payload.type === "plant") {
				try {
					const plant = await getPlant(payload.id);
					scanCount++;
					console.log(plant);

					// TODO
				} catch (error) {
					throw "Une erreur est survenue lors de la récupération des données";
				}
			} else {
				throw "Le QRCoded scanné ne correspond pas à une plante";
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
export const checkPermission = async () => {
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
export const askUser = async () => {
	await checkPermission();
	const c = confirm("Do you want to scan a barcode?");

	if (c) {
		startScan();
	}
};

/**
 * @returns Nombre de scans QR
 */
export const getScanCount = () => scanCount;

/**
 * Set le compteur à une certaine valeur
 *
 * @param {number} count Nouveau compteur
 * @returns Nouveau compteur
 */
export const setScanCount = (count) => (scanCount = count);
