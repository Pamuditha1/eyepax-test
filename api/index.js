const express = require("express");
const cors = require("cors");
const app = express();
const data = require("./data.json");

app.use(cors());
app.use(express.json());

app.get("/api/carousel", async (req, res) => {
  try {
    const slidesCount = req.query.slides;
    if (!slidesCount) return res.status(400).json({ msg: "Invalid Request" });

    if (slidesCount > 10)
      return res.status(400).json({ msg: "Maximum Count is 10" });

    const slides = data.slice(0, slidesCount);
    res.status(200).json({ data: slides });
  } catch (error) {
    console.error("Error : ", error);
    res.status(500).send(error);
  }
});

const PORT = 3600;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
