import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

/**
 * Ouvre la camera et scan le QR-code
 */
const startScan = async () => {
	BarcodeScanner.hideBackground();
	const result = await BarcodeScanner.startScan();
	if (result.hasContent) {
		console.log(result.content);
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
 * 
 */
const askUser = async () => {
	await checkPermission();
	const c = confirm("Do you want to scan a barcode?");

	if (c) {
		startScan();
	}
};

askUser();
