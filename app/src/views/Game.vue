<template>
  <div>
    <p class="infos">Scan un maximum de fleurs et revient à la ruche avant la fin du temps réglementaire</p>
    <p class="infos">Timer : 00:00</p>
    <img alt="Jardin Jean Marie Pelt" id="map" src="@/assets/map_jmp.png"/>
    <div class="infos">
      <p>Score : 0 pts</p>
    </div>
    <div class="inline">
      <button class="btn btn-nav" v-on:click="openScan"><i class="las la-qrcode">Scan</i></button>
      <button class="btn btn-nav">Plante Infos</button>
    </div>
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
