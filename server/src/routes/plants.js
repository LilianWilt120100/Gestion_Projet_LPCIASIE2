const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { generateQR } = require("../qrcode");
const { db } = require("../dabatase");

const router = Router();

/**
 * @api {get} /plants Request all plants in DB
 * @apiName GetAllPlant
 * @apiGroup Plants
 * @apiDescription List all plants
 *
 * @apiSuccess {array} result The list
 */
router.get("/", (req, res) => {
	res.json(
		db.get("plants").map(({ id, name, latin_name }) => ({
			id,
			name,
			latin_name,
		}))
	);
});

/**
 * @api {post} /plants Add a new plant
 * @apiName NewPlant
 * @apiGroup Plants
 * @apiDescription Add a new plant
 *
 * @apiSuccess {object} result The new plant
 */
router.post("/", async (req, res) => {
	const { name, latin_name, description, images, pollen, nectar } = req.body;
	const plant = {
		id: uuidv4(),
		name,
		latin_name,
		description,
		images,
		pollen,
		nectar,
		creationDate: new Date(),
		editedDate: new Date(),
	};
	await db.get("plants").push(plant).write();
	res.json(plant);
});

/**
 * @api {get} /plants/:plant Request plant informations
 * @apiName GetPlant
 * @apiGroup Plants
 * @apiDescription Get the infos of a plant.
 *
 * @apiSuccess {object} result The plant
 */
router.get("/:plantId", async (req, res) => {
	const { plantId } = req.params;
	const plant = [...db.get("plants")].find(({ id }) => plantId === id);
	if (plant) {
		res.json(plant);
	} else {
		res.status(404).json({
			status: 404,
			message: "Plant not found",
		});
	}
});

/**
 * @api {get} /plants/:plant/qrcode Request QRCode of a plant
 * @apiName GetQRPlant
 * @apiGroup Plants
 * @apiDescription Get the QRCode of a plant. For now it's randomly generated and except a name
 *
 * @apiSuccess {image/png} result The QRCode
 */
router.get("/:plantId/qrcode", async (req, res) => {
	const { plantId } = req.params;
	const plant = [...db.get("plants")].find(({ id }) => plantId === id);
	if (plant) {
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
	} else {
		res.status(404).json({
			status: 404,
			message: "Plant not found",
		});
	}
});

exports.router = router;
