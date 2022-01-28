<template>
  <div class="route">
    <div class="plant-detail" v-if="plant">
      <h1>{{ plant.name }}</h1>
      <p>Nom latin : {{ plant.latin_name }}</p>
      <p>Localisation : {{ plant.garden_spot }}</p>
      <p>nectar : {{ plant.nectar }}</p>
      <p>Pollen : {{ plant.pollen }}</p>

      <img
        v-if="plant.images && plant.images.length > 0"
        style="max-width: 360px"
        v-bind:src="`${apiUrl}/..${plant.images[0]}`"
      />
    </div>
    <div class="inline">
      <button class="btn btn-nav" v-on:click="openScan">
        <i class="las la-qrcode"></i>Scanner
      </button>
      <button class="btn btn-nav" @click="$router.push('/game')">Retour</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    apiUrl: process.env.VUE_APP_API_URL,
    plant: null,
  }),
  mounted() {
    axios
      .get(this.apiUrl + "/plants/" + this.$route.params.id)
      .then(({ data }) => {
        this.plant = data;
      })
      .catch((err) => {
        console.error(err);
        this.plant = null;
        this.$router.push("/game");
      });
  },
  methods: {
    openScan() {
      this.$router.push("/game?scan=1");
    },
  },
};
</script>
