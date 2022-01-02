const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { join } = require("path");

const file = join(__dirname, "../data.json");

const db = low(new FileSync(file));

// Set some defaults
db.defaults({ plants: [] }).write();

exports.db = db;
