<template>
  <div> 
      <table>
          <thead>
              <tr>
                  <td>Nom</td>
                  <!-- <td>Localisation</td> -->
              </tr>
          </thead>
          <tbody>
              <tr v-for="plant in plants" :key="plant">
                  <td><a href="">{{ plant.name }}</a></td>
                  <!-- {{ plant.id }} -->
                  <!-- <td>{{ plant.garden_spot }}</td> -->
              </tr>
          </tbody>

      </table>
      
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
        this.plants= data;
      })
      .catch((err) => {
        console.error(err);
        this.plants = null;
        this.$router.push("/game");
      });
  },
};
</script>
