const express = require("express");
const { router: routerPlants } = require("./routes/plants");
const { join } = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", express.static(join(__dirname, "static")));

// API DOC
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("yamljs").load("./swagger.yml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/plants", routerPlants);

app.listen(port, () => {
	console.log(`Time2Bee backend listening at http://localhost:${port}`);
});
