<template>
  <code>{{ JSON.stringify(plant) }}</code>
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
