import { API_URL } from "../main.js";

const EditionModal = {
	template: `
    <div ref="modal" class="modal fade">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">{{ modeTitle }} une plante</h5>
                  <button type="button" class="btn-close" v-on:click="modal.hide()"></button>
              </div>
              <div class="modal-body" v-if="plant">
                  <div class="input-group mb-3">
                      <span class="input-group-text" id="label-name">Nom</span>
                      <input type="text" v-model="plant.name" class="form-control" placeholder="Exemple" aria-label="Nom">
                  </div>
                  <div class="input-group mb-3">
                      <span class="input-group-text" id="label-lname">Nom latin</span>
                      <input type="text" v-model="plant.latin_name" class="form-control" placeholder="Exemplum" aria-label="Nom latin">
                  </div>

                  <div class="input-group mb-3">
                      <span class="input-group-text">Nectar</span>
                      <input type="number" v-model="plant.nectar" class="form-control" placeholder="5" aria-label="Nectar">
                      <span class="input-group-text">Pollen</span>
                      <input type="number" v-model="plant.pollen" class="form-control" placeholder="3" aria-label="Pollen">
                  </div>

                  <div class="input-group mb-3">
                      <span class="input-group-text">Emplacement</span>
                      <input type="text" v-model="plant.garden_spot" class="form-control" placeholder="Jardin" aria-label="Emplacement">
                  </div>

                  <!--
                  <div class="input-group mb-3">
                      <span class="input-group-text">Floraison</span>
                      <input type="text" v-model="plant.flowering" class="form-control" placeholder="Exemplembre" aria-label="Floraison">
                  </div>
                  -->

                  <div class="input-group mb-3">
                      <span class="input-group-text">Hauteur</span>
                      <input type="number" v-model="plant.height" class="form-control" placeholder="3" aria-label="Hauteur">
                      <span class="input-group-text">m</span>
                  </div>

                  <!--
                  <div class="input-group mb-3">
                      <span class="input-group-text">Image</span>
                      <input type="text" v-model="url" class="form-control" placeholder="exe_mple.png" aria-label="Image">
                  </div>
                  -->
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" v-on:click="modal.hide()">Fermer</button>
                  <button type="button" class="btn btn-success" v-on:click="savePlant()">Enregistrer</button>
              </div>
          </div>
      </div>
    </div>`,
	data: () => ({
		plant: {},
	}),
	mounted() {
		this.modal = new bootstrap.Modal(this.$refs.modal);
	},
	methods: {
		/**
		 * Affiche la fenêtre
		 *
		 * @returns Une promesse resolue quand la fenêtre est fermée
		 */
		show() {
			this.modal.show();
			return new Promise((resolve, reject) => {
				this.$refs.modal.addEventListener("hidden.bs.modal", function (event) {
					resolve(event);
				});
			});
		},
		async savePlant() {
			if (this.plant.id) {
				// Edition
				await fetch(API_URL + "/" + this.plant.id, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(this.plant),
				});
			} else {
				// Creation
				await fetch(API_URL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(this.plant),
				});
			}
			this.modal.hide();
		},
	},
	computed: {
		modeTitle() {
			if (this.plant.id) {
				return "Modifier";
			}
			return "Créer";
		},
	},
};

export default EditionModal;
