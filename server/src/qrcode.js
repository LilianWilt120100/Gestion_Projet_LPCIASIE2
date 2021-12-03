const QRCode = require("qrcode");

/**
 * Generate a QR Code. Used for tests, is generate random values
 *
 * @param {string} name The plant's name
 * @returns The promise of QR generation
 */
exports.generateQR = (name) => {
	const data = {
		application: "time2bee",
		payload: {
			id: Math.round(Math.random() * 100000),
			plant: true,
			name,
			pollen: Math.round(Math.random() * 100),
			nectar: Math.round(Math.random() * 100),
		},
	};

	return QRCode.toDataURL(JSON.stringify(data));
};
