const API_URL =
	process.env.NODE_ENV === "production"
		? "https://oxypomme.fr/time2bee/api"
		: "http://localhost:3000/api/";

/**
 * Récupère les informations d'une plante
 *
 * @param {string} id ID de la plante
 * @returns Les informations détaillées de la plante
 */
export const getPlant = async (id) => {
	return (await fetch(`${API_URL}/plants/${id}`)).json();
};
