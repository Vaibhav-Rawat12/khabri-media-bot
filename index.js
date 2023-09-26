const axios = require("axios");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chatbot'
})
con.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected')
    }
})


async function handleCustomMessage(sender, botId, apiKey, message) {
    const messagePayload = {
        to: sender,
        type: 'text',
        text: {
            body: message
        }
    };

    try {
        const response = await axios.post(`https://v1-api.swiftchat.ai/api/bots/${botId}/messages`, messagePayload, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Message sent to chatbot:', response.data);
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
    }
}


// BUTTON MASSAGE CODE

async function buttonMessage(botId, recipientMobile, authorization) {
    const apiUrl = `https://v1-api.swiftchat.ai/api/bots/${botId}/messages`;

    const requestBody = {
        to: recipientMobile,
        type: 'button',
        button: {
            body: {
                type: 'text',
                text: {
                    body: 'Please select the news category you would like to explore.'
                }
            },
            buttons: [
                {
                    type: 'solid',
                    body: 'Beauty',
                    reply: 'Beauty'
                },
                {
                    type: 'solid',
                    body: 'Entertainment',
                    reply: 'Entertainment'
                },
                {
                    type: 'solid',
                    body: 'States',
                    reply: 'States'
                },
                {
                    type: 'solid',
                    body: 'Sports',
                    reply: 'Sports'
                },
                {
                    type: 'solid',
                    body: 'Astrology',
                    reply: 'Astrology'
                },
                {
                    type: 'solid',
                    body: 'Consumer Awareness',
                    reply: 'Consumer Awareness'
                },
                {
                    type: 'solid',
                    body: 'Education',
                    reply: 'Education'
                },



            ],
            allow_custom_response: false
        }
    };



    axios.post(apiUrl, requestBody, {
        headers: {
            Authorization: `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            console.log('Message sent successfully:', response.data);
        })

        .catch(error => {
            console.error('Error sending message:', error.message);
        });
}




// Article Carousel




async function sendNewsAsArticleCarousel(botId, apiKey, recipientMobile, categoryId, Tags, page = 1, articlesPerPage = 10) {
    try {
        console.log(`Fetching top news (Page ${page})...`);

        const response = await axios.get(`https://khabrimedia.com/wp-json/wp/v2/posts`, {
            params: {
                categories: categoryId,
                page: page,                  
                per_page: articlesPerPage,  
            },
        });
        console.log(categoryId)
        console.log('page',page)

        const articles = response.data;

        if (articles.length === 0) {
            console.log("No news articles found.");
            return;
        }

        const cards = [];

        for (let i = 0; i < +articles.length; i++) {
            const article = articles[i];

            const thumbnailUrl = article.blog_post_layout_featured_media_urls?.thumbnail?.[0];
            const hasWebpExtension = thumbnailUrl && thumbnailUrl.endsWith('.webp');


            const maxLength = 100; 
            const truncatedTitle = article.title.rendered.length > maxLength
                ? article.title.rendered.substring(0, maxLength - 3) + '...'
                : article.title.rendered;

            const card = {
                tags: [Tags],
                title: truncatedTitle,
                description: article.excerpt.rendered,
                actions: [
                    {
                        button_text: 'Read More',
                        type: 'website',
                        website: {
                            title: 'Read More',
                            payload: article.link,
                            url: article.link,
                        },
                    },
                ],
            };

            if (!hasWebpExtension) {
                card.header = {
                    type: 'image',
                    image: {
                        url: thumbnailUrl,
                        body: 'Sample caption',
                    },
                };
            }

            cards.push(card);

            if (cards.length >= articlesPerPage) {
                break;
            }
        }

        await sendArticleCarouselToSwiftchat(botId, apiKey, recipientMobile, cards);


    } catch (error) {
        console.error('Error fetching and sending news as a card carousel:', error);
    }
}




async function sendArticleCarouselToSwiftchat(botId, apiKey, recipientMobile, cards) {
    try {
        const cardMessageData = {
            to: recipientMobile,
            type: 'article',
            article: cards,
        };

        const response = await axios.post(`https://v1-api.swiftchat.ai/api/bots/${botId}/messages`, cardMessageData, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        console.log('article carousel sent successfully:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error sending article carousel. Server responded with:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Error sending article carousel. No response received from server.');
        } else {
            console.error('Error sending article carousel:', error.message);
        }
    }
}



async function dropdownButton(botId, recipientMobile, authorization) {
    const apiUrl = `https://v1-api.swiftchat.ai/api/bots/${botId}/messages`;

    const requestBody = {
        to: recipientMobile,
        type: 'button',
        button: {
            body: {
                type: 'text',
                text: {
                    body: `Please click the button below to see more.
                    You can also click on the Select Category to go back and explore more news.`
                }
            },
            buttons: [
                {
                    type: 'solid',
                    body: 'More data',
                    reply: 'More data'
                },
                {
                    type: 'solid',
                    body: 'Select Category',
                    reply: 'Select Category'
                },

            ],
            allow_custom_response: false
        }
    };



    axios.post(apiUrl, requestBody, {
        headers: {
            Authorization: `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            console.log('Message sent successfully:', response.data);
        })

        .catch(error => {
            console.error('Error sending message:', error.message);
        });
}





app.post('/user', async (req, res) => {
    const botId = '0206680915033769';
    const apiKey = '359a2e1e-ddb9-4cc5-8029-062bdf54bd66';
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
                    console.log("category",category)
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

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});













