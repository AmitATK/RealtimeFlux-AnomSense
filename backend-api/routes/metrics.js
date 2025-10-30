const express = require("express");
const router = express.Router();
const Metrics = require("../models/Metrics");

router.get("/latest", async (req, res) => {
  try {
    const data = await Metrics.find()
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching latest metrics:", err.message);
    res.status(500).json({ error: "Failed to fetch latest metrics" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 500, 2000); 
    const data = await Metrics.find()
      .sort({ timestamp: 1 })
      .limit(limit)
      .lean();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching historical metrics:", err.message);
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
});

module.exports = router;
