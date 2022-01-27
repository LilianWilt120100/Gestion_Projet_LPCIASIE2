import {
  BarcodeScanner,
  SupportedFormat,
} from "@capacitor-community/barcode-scanner";

let scanCount = 0;

/**
 * Ouvre la camera et scan le QR-code
 *
 * @returns The QR Plant
 */
export const startScan = async () => {
  await BarcodeScanner.hideBackground();
  const result = await BarcodeScanner.startScan({
    targetedFormats: [SupportedFormat.QR_CODE],
  });
  await BarcodeScanner.showBackground();
  if (result.hasContent) {
    const { application, payload } = JSON.parse(result.content);

    if (application === "time2bee") {
      if (payload.type === "plant") {
        try {
          scanCount++;
          return payload;
        } catch (error) {
          throw "Une erreur est survenue lors de la récupération des données";
        }
      } else {
        throw "Le QRCoded scanné ne correspond pas à une plante";
      }
    } else {
      throw "Le QRcode scanné n'est pas valide";
    }
  } else {
    throw "Une erreur est survenue lors du scan du QRcode";
  }
};

/**
 * Demande la permissions pour ouvrir la camera
 *
 * @returns Th permission status
 */
export const checkPermission = async () => {
  // check or request permission
  const status = await BarcodeScanner.checkPermission({ force: true });

  if (status.denied) {
    // the user denied permission for good
    // redirect user to app settings if they want to grant it anyway
    const c = confirm(
      "Voulez vous ouvrir les paramètrs pour authoriser l'utilisation de l'appareil photo ?"
    );
    if (c) {
      await BarcodeScanner.openAppSettings();
    }
  }

  return status.granted;
};

/**
 * Vérifie les permissions et ouvre le scan
 *
 * @returns The QR Plant or null if no permission
 */
export const askUser = async () => {
  if (await checkPermission()) {
    return startScan();
  }
  return null;
};

/**
 * @returns Nombre de scans QR
 */
export const getScanCount = () => scanCount;

/**
 * Set le compteur à une certaine valeur
 *
 * @param {number} count Nouveau compteur
 * @returns Nouveau compteur
 */
export const setScanCount = (count) => (scanCount = count);
