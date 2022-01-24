import DeleteModal from "./components/DeleteModal.mjs";
import EditionModal from "./components/EditionModal.mjs";

export const API_URL = "/api/plants";

const myVueApp = Vue.createApp({
	components: {
		"edition-modal": EditionModal,
		"delete-modal": DeleteModal,
	},
	data() {
		return {
			plants: [],
		};
	},
	methods: {
		async newPlant() {
			this.$refs.editionPopup.mode = "creation";
			this.$refs.editionPopup.plant = {};
			await this.$refs.editionPopup.show();
			this.fetchPlants();
		},
		async editPlant(id) {
			// TODO: loading
			this.$refs.editionPopup.mode = "edition";
			this.$refs.editionPopup.plant = await (
				await fetch(API_URL + "/" + id)
			).json();
			await this.$refs.editionPopup.show();
			this.fetchPlants();
		},
		async deletePlant(index) {
			// TODO: loading
			const { id, name } = this.plants[index];
			this.$refs.deletionPopup.plant = {
				id,
				name,
			};
			await this.$refs.deletionPopup.show();
			this.fetchPlants();
		},
		async fetchPlants() {
			this.plants = await (await fetch(API_URL)).json();
		},
	},
	computed: {},
	mounted() {
		this.fetchPlants();
	},
});

myVueApp.mount("#container");
