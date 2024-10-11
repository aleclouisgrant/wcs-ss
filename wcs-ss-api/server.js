const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const competitorRoutes = require('./src/competitor/routes');
const competitionRoutes = require('./src/competitions/routes');

app.use(express.json());

app.get("/", (req, res) => {
    res.send("WCS-SS");
});

app.use('/api/v0/competitors', competitorRoutes);
app.use('/api/v0/competitions', competitionRoutes);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));