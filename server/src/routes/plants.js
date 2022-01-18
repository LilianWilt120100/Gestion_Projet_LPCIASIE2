const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { generateQR } = require("../qrcode");
const { db } = require("../dabatase");

const router = Router();

/**
 * @api {get} /plants Request all plants in DB
 *
 * @apiSuccess {array} The list
 */
router.get("/", (req, res) => {
	try {
		res.json(
			db.get("plants").map(({ id, name, latin_name }) => ({
				id,
				name,
				latin_name,
			}))
		);
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: error,
		});
	}
});

/**
 * @api {post} /plants Add a new plant
 *
 * @apiSuccess {object} The new plant
 */
router.post("/", async (req, res) => {
	try {
		const {
			name,
			latin_name,
			description,
			images,
			pollen,
			nectar,
			flowering,
			colors,
			garden_spot,
			honeydrew,
			height,
		} = req.body;
		// Check duplicates
		if (
			[...db.get("plants")].find(
				(p) => p.name === name && p.latin_name === latin_name
			)
		) {
			res.status(409).json({
				status: 409,
				message: "Plant already exist",
			});
		} else {
			// Putting plant in DB
			const plant = {
				id: uuidv4(),
				name,
				latin_name,
				description,
				images,
				pollen,
				nectar,
				flowering,
				colors,
				garden_spot,
				honeydrew,
				height,
				creationDate: new Date(),
				editedDate: new Date(),
			};
			await db.get("plants").push(plant).write();
			res.status(201).json(plant);
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: error,
		});
	}
});

/**
 * @api {get} /plants/:plant Request plant informations
 *
 * @apiSuccess {object} The plant
 */
router.get("/:plantId", async (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: error,
		});
	}
});

/**
 * @api {put} /plants/:plant Edit plant informations
 *
 * @apiSuccess {object} The plant
 */
router.put("/:plantId", async (req, res) => {
	try {
		const { plantId } = req.params;
		const {
			name,
			latin_name,
			description,
			images,
			pollen,
			nectar,
			flowering,
			colors,
			garden_spot,
			honeydrew,
			height,
		} = req.body;
		// Check if exist
		const plants = [...db.get("plants")];
		const index = plants.findIndex(({ id }) => id === plantId);
		if (index >= 0) {
			// Check for duplicates
			const indexDup = plants.findIndex(
				(p) => p.name === name && p.latin_name === latin_name
			);
			if (indexDup <= 0 || indexDup === index) {
				const plant = {
					id: plantId,
					name,
					latin_name,
					description,
					images,
					pollen,
					nectar,
					flowering,
					colors,
					garden_spot,
					honeydrew,
					height,
					creationDate: plants[index].creationDate,
					editedDate: new Date(),
				};
				await db.get("plants").splice(index, 1, plant).write();
				res.json(plant);
			} else {
				res.status(409).json({
					status: 409,
					message: "Plant with same name or latin_name already exist",
				});
			}
		} else {
			res.status(404).json({
				status: 404,
				message: "Plant not found",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: error,
		});
	}
});

/**
 * @api {get} /plants/:plant/qrcode Get the QRCode of a plant.
 *
 * @apiSuccess {image/png} The QRCode
 */
router.get("/:plantId/qrcode", async (req, res) => {
	try {
		const { plantId } = req.params;
		const plant = [...db.get("plants")].find(({ id }) => plantId === id);
		if (plant) {
			const base64 = await generateQR({
				id: plant.id,
				creationDate: new Date(),
			});
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
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: error,
		});
	}
});

exports.router = router;
