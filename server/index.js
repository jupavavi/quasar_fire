const path = require("path");
const express = require("express");
const cookieSession = require('cookie-session')
const satellitesController = require("./controllers/satellites");
const positionController = require("./controllers/topsecrect");
const positionSplitController = require("./controllers/topsecrect_split");

const app = express();

app.set("trust proxy", 1); // trust first proxy
 
app.use(cookieSession({
    name: "session",
    keys: ["key1"],
}));


app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json()); // for parsing application/json

app.get("/satellites", satellitesController.get);
app.post("/topsecret", positionController.post);
app.get("/topsecret_split", positionSplitController.get);
app.post("/topsecret_split/:id", positionSplitController.post);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(8080);
