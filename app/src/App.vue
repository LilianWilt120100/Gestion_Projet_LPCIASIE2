<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Time2Bee";
      },
    },
  },
};
</script>

<style>
h1 {
  text-align: center;
  color: #806e1e;
}

#contener {
  text-align: center;
  overflow: hidden;
}

.route {
  height: 100vh;
  overflow: auto;
}

body {
  background-color: #f9f9dd;
  background-size: cover;
  overflow: hidden;
}

.square_btn {
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 4px;
  color: #ffffff;
  background-image: -webkit-linear-gradient(45deg, #ffc107 0%, #ff8b5f 100%);
  background-image: linear-gradient(45deg, #ffc107 0%, #ff8b5f 100%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 3px #c58668;
}

.square_btn:active {
  -ms-transform: translateY(4px);
  -webkit-transform: translateY(4px);
  transform: translateY(4px);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
  border-bottom: none;
}

#miel {
  width: 300px;
  height: 252px;
  margin-top: 3em;
}

#barre {
  margin-left: 0.5em;
}

#start-game-btn {
  margin-top: 5vh;
  font-size: 1.5em;
  padding-top: 0.5em;
  text-align: center;
  font-weight: bold;
  width: 8em;
  height: 3em;
}

#tabScore {
  width: 600px;
  height: 10px;
  font-size: 1.5em;
  margin: 1em auto auto;
}

#beesmall {
  width: 10%;
  margin-top: 2em;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  body {
    background-image: none;
    background-color: #f9f9dd;
  }

  h1 {
    margin-top: 5vh;
  }

  #miel {
    margin-top: 11vh;
    height: 190px;
    width: 220px;
  }

  #bee {
    width: 178px;
    height: 170px;
    margin-top: 2vh;
  }

  #barre {
    width: 350px;
    margin-left: 1vh;
    margin-top: 3vh;
  }

  #start-game-btn {
    margin-top: 5vh;
    font-size: 1.5em;
    padding-top: 0.5em;
    text-align: center;
    font-weight: bold;
    width: 8em;
    height: 3em;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  body {
    background-image: none;
    background-color: #f9f9dd;
  }

  h1 {
    margin-top: 5vh;
  }

  #miel {
    margin-left: 38%;
    margin-top: 11vh;
    height: 190px;
    width: 220px;
  }

  #bee {
    width: 178px;
    height: 170px;
    margin-top: 2vh;
  }

  #barre {
    width: 550px;
    height: 110px;
    margin-left: 1vh;
    margin-top: 3vh;
  }

  #start-game-btn {
    margin-top: 5vh;
    font-size: 2em;
    padding-top: 0.5em;
    text-align: center;
    font-weight: bold;
    width: 8em;
    height: 3em;
  }
}

#map {
  height: 55vh;
}
.inline {
  display: flex;
  margin: 5%;
  justify-content: space-evenly;
}
.infos {
  padding: 2%;
  text-align: center;
}
.btn-nav {
  background-color: orange;
  width: 40vw;
  height: 15vh;
}
.plant-detail {
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
table {
  text-align: center;
}
</style>
