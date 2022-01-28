<template>
  <div class="route">
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Localisation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(plant, i) in plants" :key="i">
          <td>{{ plant.name }}</td>
          <td>{{ plant.garden_spot }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-nav" @click="$router.push('/game')">Retour</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    plants: null,
  }),
  mounted() {
    axios
      .get(process.env.VUE_APP_API_URL + "/plants")
      .then(({ data }) => {
        this.plants = data;
      })
      .catch((err) => {
        console.error(err);
        this.plants = null;
        this.$router.push("/game");
      });
  },
};
</script>
