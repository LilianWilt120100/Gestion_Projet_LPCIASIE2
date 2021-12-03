const express = require("express");
const { generateQR } = require("./qrcode");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

/**
 * @api {get} /qrcode/:plant Request QRCode of a plant
 * @apiName GetQRPlant
 * @apiGroup QRCode
 * @apiDescription Get the QRCode of a plant. For now it's randomly generated and except a name
 *
 * @apiSuccess {image/png} result The QRCode
 */
app.get("/qrcode/:plant", async (req, res) => {
	const { plant } = req.params;

	const base64 = await generateQR(plant);
	// Encoding base64 into Buffer
	const qrcode = Buffer.from(
		// Removing base64 descriptor
		base64.replace(/^.*,/, ""),
		"base64"
	);

	res.writeHead(200, {
		"Content-Type": "image/png",
		"Content-Length": qrcode.length,
	});
	res.end(qrcode);
});

app.listen(port, () => {
	console.log(`Time2Bee backend listening at http://localhost:${port}`);
});
