const express = require("express");
const router = express.Router();
const sendSessionMessage = require("../controller/messages");

router.post("/khabriwebhook", (req, res) => {
  let id = sendSessionMessage();
});

module.exports = router;
