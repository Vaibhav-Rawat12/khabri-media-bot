const express = require("express");
const router = express.Router();
require("dotenv").config()
const { handleCustomMessage,
    dropdownButton,
    sendNewsAsArticleCarousel,
    buttonMessage, } = require("../controller/messages");

const {con} = require("../config/config");




router.post('/user', async (req, res) => {
    const botId = process.env.botId
    const apiKey = process.env.apiKey;
    let categoryId;



    if (req.body.type === 'text') {
        if (req.body.text.body && req.body.text.body.toLowerCase() === 'hi') {
            const customMessage = `Welcome to the Khabri Media News!
                Stay tuned for in-depth reporting, insightful analysis, and breaking news that matters to you.
                Get all your news updates in one place on Khabri Media!`
            await handleCustomMessage(req.body.from, botId, apiKey, customMessage)
            await buttonMessage(botId, req.body.from, apiKey)

            res.sendStatus(200);
        }
    }

    if (req.body.type === 'button_response') {


        if (req.body.button_response.body === 'Beauty') {

            const mobileNumber = req.body.from;
            const tags = req.body.button_response.body;
            const pageNo = 1;

            const insertQuery = `INSERT INTO User1 (MobileNo, Tags, PageNo) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Tags = ?, PageNo = ?`;

            con.query(
                insertQuery,
                [mobileNumber, tags, pageNo, tags, pageNo],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting/updating user preferences:', err);
                    } else {
                        console.log('User preferences inserted/updated successfully:', result);
                    }
                }
            );

            categoryId = '70,10'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)


        }
        if (req.body.button_response.body === 'Entertainment') {
            const mobileNumber = req.body.from;
            const tags = req.body.button_response.body;
            const pageNo = 1;

            const insertQuery = `INSERT INTO User1 (MobileNo, Tags, PageNo) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Tags = ?, PageNo = ?`;

            con.query(
                insertQuery,
                [mobileNumber, tags, pageNo, tags, pageNo],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting/updating user preferences:', err);
                    } else {
                        console.log('User preferences inserted/updated successfully:', result);
                    }
                }
            );
            categoryId = '48,2'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'States') {

            const mobileNumber = req.body.from;
            const tags = req.body.button_response.body;
            const pageNo = 1;

            const insertQuery = `INSERT INTO User1 (MobileNo, Tags, PageNo) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Tags = ?, PageNo = ?`;

            con.query(
                insertQuery,
                [mobileNumber, tags, pageNo, tags, pageNo],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting/updating user preferences:', err);
                    } else {
                        console.log('User preferences inserted/updated successfully:', result);
                    }
                }
            );

            categoryId = '85,86,82,88,84,66,92,87,65,90,83,89'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'Sports') {
            const mobileNumber = req.body.from;
            const tags = req.body.button_response.body;
            const pageNo = 1;

            const insertQuery = `INSERT INTO User1 (MobileNo, Tags, PageNo) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Tags = ?, PageNo = ?`;

            con.query(
                insertQuery,
                [mobileNumber, tags, pageNo, tags, pageNo],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting/updating user preferences:', err);
                    } else {
                        console.log('User preferences inserted/updated successfully:', result);
                    }
                }
            );

            categoryId = '49'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'Astrology') {
            const mobileNumber = req.body.from;
            const tags = req.body.button_response.body;
            const pageNo = 1;

            const insertQuery = `INSERT INTO User1 (MobileNo, Tags, PageNo) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Tags = ?, PageNo = ?`;

            con.query(
                insertQuery,
                [mobileNumber, tags, pageNo, tags, pageNo],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting/updating user preferences:', err);
                    } else {
                        console.log('User preferences inserted/updated successfully:', result);
                    }
                }
            );

            categoryId = '80'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'Consumer Awareness') {
            const mobileNumber = req.body.from;
            const tags = req.body.button_response.body;
            const pageNo = 1;

            const insertQuery = `INSERT INTO User1 (MobileNo, Tags, PageNo) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Tags = ?, PageNo = ?`;

            con.query(
                insertQuery,
                [mobileNumber, tags, pageNo, tags, pageNo],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting/updating user preferences:', err);
                    } else {
                        console.log('User preferences inserted/updated successfully:', result);
                    }
                }
            );

            categoryId = '81'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'Education') {

            const mobileNumber = req.body.from;
            const tags = req.body.button_response.body;
            const pageNo = 1;

            const insertQuery = `INSERT INTO User1 (MobileNo, Tags, PageNo) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Tags = ?, PageNo = ?`;

            con.query(
                insertQuery,
                [mobileNumber, tags, pageNo, tags, pageNo],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting/updating user preferences:', err);
                    } else {
                        console.log('User preferences inserted/updated successfully:', result);
                    }
                }
            );

            categoryId = '11,13'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }



        if (req.body.button_response.body === 'More data') {
            const mobileNumber = req.body.from;
            let categoryid
            let nextPage

            const selectQuery = `SELECT Tags, PageNo FROM User1 WHERE MobileNo = ? ORDER BY Id DESC LIMIT 1`;
            console.log(selectQuery);

            con.query(selectQuery, [mobileNumber], async (err, rows) => {
                if (err) {
                    console.error('Error retrieving user preferences:', err);
                } else if (rows.length > 0) {
                    const { Tags: category, PageNo: currentPage } = rows[0];
                    console.log("category", category)
                    if (category == "Beauty") {
                        categoryid = '70,10'
                        nextPage = currentPage + 1;
                    }
                    if (category == "Entertainment") {
                        categoryid = '48,2'
                        nextPage = currentPage + 1;
                    }
                    if (category == "States") {
                        categoryid = '85,86,82,88,84,66,92,87,65,90,83,89'
                        nextPage = currentPage + 1;
                    }
                    if (category == "Sports") {
                        categoryid = '49'
                        nextPage = currentPage + 1;
                    }
                    if (category == "Astrology") {
                        categoryid = '80'
                        nextPage = currentPage + 1;
                    }
                    if (category == "Consumer Awareness") {
                        categoryid = '81'
                        nextPage = currentPage + 1;
                    }

                    if (category == "Education") {
                        categoryid = '11,13'
                        nextPage = currentPage + 1;
                    }

                    await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryid, category, nextPage);
                    const updatePageQuery = `UPDATE User1 SET PageNo = ? WHERE MobileNo = ?`;

                    con.query(updatePageQuery, [nextPage, mobileNumber], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error('Error updating page number:', updateErr);
                        } else {
                            console.log('Page number updated successfully:', updateResult);
                        }
                    });

                    await dropdownButton(botId, req.body.from, apiKey)
                }
            });
        }

        if (req.body.button_response.body === 'Select Category') {
            await buttonMessage(botId, req.body.from, apiKey)
            const mobileNumber = req.body.from;
            const page = 1

            const updatePageQuery = `UPDATE User1 SET PageNo = ? WHERE MobileNo = ?`;

            con.query(updatePageQuery, [page, mobileNumber], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating page number:', updateErr);
                } else {
                    console.log('Page number updated successfully:', updateResult);
                }
            });

        }

        if (req.body.button_response.body !== 'Select Category' & req.body.button_response.body !== 'More data') {
            await dropdownButton(botId, req.body.from, apiKey)
        }

    }

});


module.exports = router;