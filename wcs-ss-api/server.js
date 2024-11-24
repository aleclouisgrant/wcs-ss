const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const competitorRoutes = require('./src/competitor/routes');
const judgeRoutes = require('./src/judge/routes');
const competitionRoutes = require('./src/competition/routes');

app.use(express.json());

app.get("/", (req, res) => {
    res.send("WCS-SS");
});

app.use('/api/v0/competitors', competitorRoutes);
app.use('/api/v0/judges', judgeRoutes);
app.use('/api/v0/competitions', competitionRoutes);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));