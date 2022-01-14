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
 * @apiName NewPlant
 * @apiGroup Plants
 * @apiDescription Add a new plant
 *
 * @apiSuccess {object} result The new plant
 */
router.post("/", async (req, res) => {
	try {
		const { name, latin_name, description, images, pollen, nectar } = req.body;
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
 * @apiName GetPlant
 * @apiGroup Plants
 * @apiDescription Get the infos of a plant.
 *
 * @apiSuccess {object} result The plant
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
 * @apiName EditPlant
 * @apiGroup Plants
 * @apiDescription Edit the infos of a plant. Add it if doesn't exist.
 *
 * @apiSuccess {object} result The plant
 */
router.put("/:plantId", async (req, res) => {
	try {
		const { plantId } = req.params;
		const { name, latin_name, description, images, pollen, nectar } = req.body;
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
					creationDate: plants[index].creationDate,
					editedDate: new Date(),
				};
				await db.get("plants").splice(index, 1, plant).write();
				res.json(plant);
			} else {
				res.status(404).json({
					status: 404,
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
 * @api {get} /plants/:plant/qrcode Request QRCode of a plant
 * @apiName GetQRPlant
 * @apiGroup Plants
 * @apiDescription Get the QRCode of a plant. For now it's randomly generated and except a name
 *
 * @apiSuccess {image/png} result The QRCode
 */
router.get("/:plantId/qrcode", async (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: error,
		});
	}
});

exports.router = router;
