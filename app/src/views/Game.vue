<template>
  <div class="route">
    <p class="infos">
      Scanne un maximum de fleurs et revient à la ruche avant la fin du temps
      réglementaire
    </p>
    <p class="infos">Timer : {{ timer }}</p>
    <img alt="Jardin Jean Marie Pelt" id="map" src="@/assets/map_jmp.png" />
    <div class="infos">
      <p>Score : {{ scanCount }} pts</p>
    </div>
    <div class="inline">
      <button class="btn btn-nav" v-on:click="openScan">
        <i class="las la-qrcode"></i>Scanner
      </button>
      <router-link tag="button" class="btn btn-nav" to="/plants">
        Plante Infos
      </router-link>
    </div>
  </div>
</template>

<script>
import Duration from "@icholy/duration";
import { askUser, getScanCount } from "@/js/qrcode.js";
import { getTime } from "@/js/timer.js";

let interval = null;

export default {
  data: () => ({
    timer: 0,
    scanCount: 0,
  }),
  methods: {
    async openScan() {
      // https://github.com/capacitor-community/barcode-scanner/issues/26#issuecomment-808862821
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
  mounted() {
    // Setup dynamic values
    this.timer = getTime();
    this.scanCount = getScanCount();
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      this.timer = getTime();
      this.scanCount = getScanCount();
    }, Duration.second);

    if (this.$route.query.scan) {
      this.openScan();
    }
  },
};
</script>
