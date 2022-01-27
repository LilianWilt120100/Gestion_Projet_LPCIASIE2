<template>
  <div class="plant-detail">
    <h1>{{ plant.name }}</h1>
    <p>Nom latin : {{ plant.latin_name }}</p>
    <p>Localisation : {{ plant.garden_spot }}</p>
    <p>nectar : {{ plant.nectar }}</p>
    <p>Pollen : {{ plant.pollen }}</p>

    <p>Image : {{ plant.images[0] }}</p>
    
    <!-- <img src="./server/src/static/{{ plant.images[0] }}"> -->

    <div class="inline">
      <button class="btn btn-nav" v-on:click="openScan"><i class="las la-qrcode"></i>Scanner</button>
      <button class="btn btn-nav">Retour à la carte</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    plant: null,
  }),
  mounted() {
    axios
      .get(process.env.VUE_APP_API_URL + "/plants/" + this.$route.params.id)
      .then(({ data }) => {
        this.plant = data;
      })
      .catch((err) => {
        console.error(err);
        this.plant = null;
        this.$router.push("/game");
      });
  },
};
</script>
