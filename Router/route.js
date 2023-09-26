const express = require("express");
const router = express.Router();
require("dotenv").config()
const { handleCustomMessage, buttonMessage, sendNewsAsArticleCarousel, dropdownButton } = require("../controller/messages");


router.post("/user", async (req, res) => {
  console.log(req.body);
  const botId = process.env.botId
  const apiKey = process.env.apiKey;
  let categoryId;
  if (req.body.type === "text") {
    if (req.body.text.body && req.body.text.body.toLowerCase() === "hi") {
      const customMessage = `Welcome to the Khabri Media News!
          Stay tuned for in-depth reporting, insightful analysis, and breaking news that matters to you.
          Get all your news updates in one place on Khabri Media!`;
      await handleCustomMessage(req.body.from, botId, apiKey, customMessage);
      await buttonMessage(botId, req.body.from, apiKey);
      res.sendStatus(200);
    }
  }

  if (req.body.type === "button_response") {
    if (req.body.button_response.body === "Beauty") {
      categoryId = "70,10";
      await sendNewsAsArticleCarousel(
        botId,
        apiKey,
        req.body.from,
        categoryId,
        req.body.button_response.body
      );
    }
    if (req.body.button_response.body === "Entertainment") {
      console.log("Entertainment")
      categoryId = "48,2";
      await sendNewsAsArticleCarousel(
        botId,
        apiKey,
        req.body.from,
        categoryId,
        req.body.button_response.body
      );
    }
    if (req.body.button_response.body === "States") {
      categoryId = "85,86,82,88,84,66,92,87,65,90,83,89";
      await sendNewsAsArticleCarousel(
        botId,
        apiKey,
        req.body.from,
        categoryId,
        req.body.button_response.body
      );
    }
    if (req.body.button_response.body === "Sports") {
      categoryId = "49";
      await sendNewsAsArticleCarousel(
        botId,
        apiKey,
        req.body.from,
        categoryId,
        req.body.button_response.body
      );
    }
    if (req.body.button_response.body === "Astrology") {
      categoryId = "80";
      await sendNewsAsArticleCarousel(
        botId,
        apiKey,
        req.body.from,
        categoryId,
        req.body.button_response.body
      );
    }
    if (req.body.button_response.body === "Consumer Awareness") {
      categoryId = "81";
      await sendNewsAsArticleCarousel(
        botId,
        apiKey,
        req.body.from,
        categoryId,
        req.body.button_response.body
      );
    }
    if (req.body.button_response.body === "Education") {
      categoryId = "11,13";
      await sendNewsAsArticleCarousel(
        botId,
        apiKey,
        req.body.from,
        categoryId,
        req.body.button_response.body
      );
    }

    if (req.body.button_response.body === "More data") {
      // Get the current page for this user and category
      const userCategoryKey = `${req.body.from}_${categoryId}`;
      console.log("userCategoryKey", userCategoryKey);
      // const currentPage = userCategoryPages.get(userCategoryKey) || 1;

      await sendNewsAsArticleCarousel(
        botId,
        apiKey,
        req.body.from,
        categoryId,
        req.body.button_response.body,
        currentPage + 1
      );
    }

    if (req.body.button_response.body === "Select Category") {
      await buttonMessage(botId, req.body.from, apiKey);
    }

    if (req.body.button_response.body !== "Select Category") {
      await dropdownButton(botId, req.body.from, apiKey);
    }
  }
});

module.exports = router;
