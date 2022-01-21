const API_URL = "http://localhost:3000/api/plants";

const myVueApp = Vue.createApp({
	data() {
		return {
			plants: [],
			currentPlant: undefined,
		};
	},
	methods: {
		editPlant(plantId) {
			this.currentPlant = plantId;
		},
		async deletePlant(plantId) {
			await fetch(API_URL + "/" / plantId, {
				method: "DELETE",
			});
			const index = this.plants.findIndex((p) => p.id === plantId);
			this.plants.splice(index, 1);
		},
	},
	computed: {},
	async mounted() {
		this.plants = await (await fetch(API_URL)).json();
	},
});

myVueApp.mount("#container");
