const express = require("express");
const { router: routerPlants } = require("./routes/plants");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/static", express.static("src/static"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// API DOC
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("yamljs").load("./swagger.yml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/plants", routerPlants);

app.listen(port, () => {
	console.log(`Time2Bee backend listening at http://localhost:${port}`);
});
