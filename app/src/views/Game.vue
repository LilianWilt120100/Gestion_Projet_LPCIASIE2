<template>
  <div>
    <div>Partie en cours</div>
    <button v-on:click="openScan">Scan</button>
  </div>
</template>

<script>
import { askUser } from "@/js/qrcode.js";

export default {
  methods: {
    async openScan() {
      //https://github.com/capacitor-community/barcode-scanner/issues/26#issuecomment-808862821
      document.body.style.display = "none";
      // TODO: User pressed back button
      try {
        const plantQR = await askUser();
        if (plantQR) {
          this.$router.push("/plant/" + plantQR.id);
        } else {
          throw "No Permission to open camera";
        }
      } catch (error) {
        //TODO
      } finally {
        document.body.style.display = "";
      }
    },
  },
};
</script>
