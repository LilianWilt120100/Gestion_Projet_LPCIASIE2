const QRCode = require("qrcode");

/**
 * Generate a QR Code. Used for tests, is generate random values
 *
 * @param {object} plant The plant
 * @returns The promise of QR generation
 */
exports.generateQR = ({ id }) => {
	const data = {
		application: "time2bee",
		payload: {
			id,
			creationDate: new Date(),
		},
	};

	return QRCode.toDataURL(JSON.stringify(data));
};
