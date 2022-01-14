import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

const startScan = async () => {
	BarcodeScanner.hideBackground();
	const result = await BarcodeScanner.startScan();
	if (result.hasContent) {
		console.log(result.content);
	}
};

const askUser = () => {
	const c = confirm("Do you want to scan a barcode?");

	if (c) {
		startScan();
	}
};

askUser();
