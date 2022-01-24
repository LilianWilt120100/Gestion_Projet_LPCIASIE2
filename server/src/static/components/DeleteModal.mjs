import { API_URL } from "../main.js";

const DeleteModal = {
	template: `
  <div ref="modal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Supprimer cette plante</h5>

                    <button type="button" class="btn-close" v-on:clicl="modal.hide()"></button>
                </div>
                <div class="modal-body">
                    <p>Etes-vous sur de vouloir supprimer cette plante ?</p>
                    <p>Recopier le nom de la plante pour valider: "{{ plant.name }}"</p>
                    <input type="text" v-model="inputName" class="form-control" placeholder="Exemple" aria-label="Nom">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" v-on:click="modal.hide()">Retour</button>
                    <button type="button" class="btn btn-danger" v-on:click="validDelete">Supprimer</button>
                </div>
            </div>
        </div>
    </div>`,
	data: () => ({
		plant: {
			id: "",
			name: "",
		},
		inputName: "",
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
		async validDelete() {
			if (this.inputName.trim() === this.plant.name) {
				await fetch(API_URL + "/" + this.plant.id, {
					method: "DELETE",
				});
				this.modal.hide();
			} else {
				// TODO: Show error
			}
		},
	},
};

export default DeleteModal;
