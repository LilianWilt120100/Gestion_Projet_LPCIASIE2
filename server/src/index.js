const express = require("express");
const { router: routerPlants } = require("./routes/plants");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/plants", routerPlants);

app.listen(port, () => {
	console.log(`Time2Bee backend listening at http://localhost:${port}`);
});
