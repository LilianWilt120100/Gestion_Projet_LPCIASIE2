//#region QR

/**
 * Actual data in QR Code
 */
type QRData = {
	/**
	 * Application ID
	 */
	application: "time2bee";
	/**
	 * Payload
	 */
	payload: QRPayload;
};

/**
 * Types of payload in QR Code
 */
type QRPayload = QRPlant;

/**
 * Plant data present in the QR Code
 */
type QRPlant = {
	/**
	 * UID of the plant. Must match with onee in DB.
	 */
	id: string;
	/**
	 * Creation date of the QR Code
	 */
	creationDate: Date;
};

//#endregion

//#region DB

/**
 * Plant data served by API
 */
type Plant = {
	/**
	 * UID of the plant
	 */
	id: string;
	/**
	 * Usual name of the plant
	 */
	name: string;
	/**
	 * Latin name of the plant
	 */
	latin_name: string;
	/**
	 * Description of the plant
	 */
	description: string;
	/**
	 * URLs of images
	 */
	images: string[];
	/**
	 * Amount of "pollen" collected wheen scanning the plant
	 */
	pollen: number;
	/**
	 * Amount of "nectar" collected when scanning the plant
	 */
	nectar: number;
	/**
	 * Creation date of the plant (in DB)
	 */
	creationDate: Date;
	/**
	 * Edition date of the plant (in DB)
	 */
	editedDate: Date;
};

//#endregion
