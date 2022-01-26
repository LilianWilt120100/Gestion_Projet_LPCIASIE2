<template>
  <div>
    <h1>Bienvenue sur Time2Bee</h1>
    <div id="contener">
      <div>
        <img alt="abeille" id="bee" src="@/assets/bee.png" />
        <br />
        <img
          alt="barre-verte"
          id="barre"
          src="@/assets/barre_separation_verte.png"
        />
      </div>

      <a href="#" v-on:click="startGame" class="square_btn"
        >Jouer {{ timer }}</a
      >
    </div>
    <img alt="" id="miel" src="@/assets/miel.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import { setScanCount } from "@/js/qrcode";
import { startTimer } from "@/js/timer";
import { getTimeLeft } from "@/js/timer";

export default {
  name: "Home",
  methods: {
    startGame(e) {
      e.preventDefault();

      setScanCount(0);
      startTimer().then(() => {
        alert("Fin du game");
      });
    },
  },
  computed: {
    timer: getTimeLeft,
  },
};
</script>
