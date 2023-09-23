const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

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
                    body: 'Hello, click on the button to filter the {2} class maths videos.'
                }
            },
            buttons: [
                {
                    type: 'solid',
                    body: 'Mathematics, Class 1',
                    reply: 'Mathematics, Class 1'
                },
                {
                    type: 'solid',
                    body: 'Mathematics quiz, Class 1',
                    reply: 'Mathematics quiz, Class 1'
                },
                {
                    icon: 'registration',
                    type: 'dotted',
                    body: 'Add another student',
                    reply: 'Add another student'
                }
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



// Card Massage



async function sendNewsAsCardCarousel(botId, apiKey, recipientMobile) {
    try {
        console.log("Fetching top news...");

        const response = await axios.get('https://khabrimedia.com/wp-json/wp/v2/posts?categories=8');

        const articles = response.data;

        if (articles.length === 0) {
            console.log("No news articles found.");
            return;
        }

        const cards = [];

        for (let i = 0; i < Math.min(10, articles.length); i++) {
            const article = articles[i];

            cards.push({
                header: {
                    type: 'image',
                    image: {
                        url: 'https://sm.mashable.com/t/mashable_sea/photo/default/one-piece-netflix-review_3s1b.2496.jpg', // Replace with an actual image ID
                        body: 'Test',
                    },
                },
                body: {
                    title: article.title.rendered,
                    subtitle: new Date(article.date).toLocaleDateString(),
                },
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
            });
        }

        await sendCardCarouselToSwiftchat(botId, apiKey, recipientMobile, cards);
    } catch (error) {
        console.error('Error fetching and sending news as a card carousel:', error);
    }
}

async function sendCardCarouselToSwiftchat(botId, apiKey, recipientMobile, cards) {
    try {
        const cardMessageData = {
            to: recipientMobile,
            type: 'card',
            card: cards,
        };

        const response = await axios.post(`https://v1-api.swiftchat.ai/api/bots/${botId}/messages`, cardMessageData, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        console.log('Card carousel sent successfully:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error sending card carousel. Server responded with:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Error sending card carousel. No response received from server.');
        } else {
            console.error('Error sending card carousel:', error.message);
        }
    }
}




// Article Carousel

async function sendNewsAsArticleCarousel(botId, apiKey, recipientMobile) {
    try {
        console.log("Fetching top news...");

        const response = await axios.get('https://khabrimedia.com/wp-json/wp/v2/posts?categories=8');

        const articles = response.data;

        if (articles.length === 0) {
            console.log("No news articles found.");
            return;
        }

        const cards = [];

        for (let i = 0; i < Math.min(10, articles.length); i++) {
            const article = articles[i];

            cards.push({
                tags: [
                    "Science"
                ],
                title: article.title.rendered,
                header: {
                    type: 'image',
                    image: {
                        url: 'https://sm.mashable.com/t/mashable_sea/photo/default/one-piece-netflix-review_3s1b.2496.jpg', // Replace with an actual image URL
                        body: 'Sample caption',
                    },
                },
                description: "Sample description",
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
            });
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









app.post('/user', async (req, res) => {
    const botId = '0206680915033769';
    const apiKey = '359a2e1e-ddb9-4cc5-8029-062bdf54bd66';

    if (req.body.type === 'text') {
        if (req.body.text.body && req.body.text.body.toLowerCase() === 'hi') {
            const customMessage = 'Welcome to the Khabri Media News!'
            // await sendNewsAsCardCarousel(botId, apiKey, req.body.from)
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from)

            await handleCustomMessage(req.body.from, botId, apiKey, customMessage)
            await buttonMessage(botId, req.body.from, apiKey)

            res.sendStatus(200);
        }
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
