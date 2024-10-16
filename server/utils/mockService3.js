import express from "express";
const app = express();

// Simulate random response times and statuses
app.get("/", (req, res) => {
  const random = Math.random();

  if (random < 0.7) {
    // 70% chance of returning 200 OK
    res.status(200).send("Service is up");
  } else if (random < 0.9) {
    // 20% chance of returning 500 Internal Server Error
    res.status(500).send("Service is down");
  } else {
    // 10% chance of taking too long to respond
    setTimeout(() => {
      res.status(504).send("Service timeout");
    }, 5000);
  }
});

const PORT = 8083;
app.listen(PORT, () => {
  console.log(`Mock Service 3 running on port ${PORT}`);
});
