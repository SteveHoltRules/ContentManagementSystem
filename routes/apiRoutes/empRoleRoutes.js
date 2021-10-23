const express = require("express");
const router = express.Router();
const db = require("../../db/Connection");

router.get("/roles", (req, res) => {
  const sql = `SELECT * FROM empRole`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});
