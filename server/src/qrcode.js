const QRCode = require("qrcode");

/**
 * Generate a QR Code.
 *
 * @param {object} payload The payload
 * @returns The promise of QR generation
 */
exports.generateQR = (payload) =>
	QRCode.toDataURL(
		JSON.stringify({
			application: "time2bee",
			payload,
		})
	);
