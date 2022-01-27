<template>
  <div>
    <h1>Partie terminé !</h1>
    <div id="contener">
      <div>
        <img alt="abeille" id="beesmall" src="@/assets/bee.png" />
        <table id="tabScore">
          <tr>
            <!-- <td>Score</td> -->
            <td>Nombre de fleurs scannées</td>
            <td>Temps</td>
          </tr>
          <tr>
            <!-- <td>1000</td> -->
            <td>{{ scanCount }}</td>
            <td>{{ duration }}</td>
          </tr>
        </table>
        <br />
        <img
          alt="barre-verte"
          id="barre"
          src="@/assets/barre_separation_verte.png"
        />
      </div>

      <router-link to="/" id="accueil-btn" class="square_btn">
        Accueil
      </router-link>
    </div>
  </div>
</template>

<script>
import { getScanCount } from "@/js/qrcode";
import { getTotalDuration } from "@/js/timer";

export default {
  name: "End",
  computed: {
    scanCount: getScanCount,
    duration() {
      const duration = getTotalDuration() ?? "0";
      return duration.toString();
    },
  },
};
</script>
