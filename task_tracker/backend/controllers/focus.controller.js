import { db } from "../db.js";

export const getFocus = (req, res) => {
  db.query("SELECT total_seconds FROM focus_stats WHERE id=1", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
};

export const updateFocus = (req, res) => {
  const { total_seconds } = req.body;
  db.query(
    "UPDATE focus_stats SET total_seconds=? WHERE id=1",
    [total_seconds],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Focus time updated" });
    }
  );
};
