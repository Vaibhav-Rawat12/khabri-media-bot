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



                // {
                //     icon: 'registration',
                //     type: 'dotted',
                //     body: 'Add another student',
                //     reply: 'Add another student'
                // }
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

// async function sendNewsAsArticleCarousel(botId, apiKey, recipientMobile, categoryId, Tags) {
//     try {
//         console.log("Fetching top news...");

//         const response = await axios.get(`https://khabrimedia.com/wp-json/wp/v2/posts?categories=${categoryId}`);

//         const articles = response.data;

//         if (articles.length === 0) {
//             console.log("No news articles found.");
//             return;
//         }

//         const cards = [];

//         for (let i = 0; i < Math.min(10, articles.length); i++) {
//             const article = articles[i];
//             console.log(article.blog_post_layout_featured_media_urls.thumbnail[0])

//             cards.push({
//                 tags: [
//                     Tags
//                 ],
//                 title: article.title.rendered,

//                 header: {
//                     type: 'image',
//                     image: {
//                         url: 'https://khabrimedia.com/wp-content/uploads/2023/09/health-tips-150x150.webp', // Replace with an actual image URL
//                         body: 'Sample caption',
//                     },
//                 },
//                 description: article.excerpt.rendered,
//                 actions: [
//                     {
//                         button_text: 'Read More',
//                         type: 'website',
//                         website: {
//                             title: 'Read More',
//                             payload: article.link,
//                             url: article.link,
//                         },
//                     },
//                 ],
//             });
//         }

//         await sendArticleCarouselToSwiftchat(botId, apiKey, recipientMobile, cards);
//     } catch (error) {
//         console.error('Error fetching and sending news as a card carousel:', error);
//     }
// }


// async function sendNewsAsArticleCarousel(botId, apiKey, recipientMobile, categoryId, Tags) {
//     try {
//         console.log("Fetching top news...");

//         const response = await axios.get(`https://khabrimedia.com/wp-json/wp/v2/posts?categories=${categoryId}`);

//         const articles = response.data;

//         if (articles.length === 0) {
//             console.log("No news articles found.");
//             return;
//         }

//         const cards = [];

//         for (let i = 0; i < Math.min(10, articles.length); i++) {
//             const article = articles[i];

//             const thumbnailUrl = article.blog_post_layout_featured_media_urls?.thumbnail?.[0];

//             const hasWebpExtension = thumbnailUrl && thumbnailUrl.endsWith('.webp');

//             const card = {
//                 tags: [Tags],
//                 title: article.title.rendered,
//                 description: article.excerpt.rendered,
//                 actions: [
//                     {
//                         button_text: 'Read More',
//                         type: 'website',
//                         website: {
//                             title: 'Read More',
//                             payload: article.link,
//                             url: article.link,
//                         },
//                     },
//                 ],
//             };

//             if (!hasWebpExtension) {
//                 card.header = {
//                     type: 'image',
//                     image: {
//                         url: thumbnailUrl,
//                         body: 'Sample caption',
//                     },
//                 };
//             }

//             cards.push(card);
//         }

//         await sendArticleCarouselToSwiftchat(botId, apiKey, recipientMobile, cards);
//     } catch (error) {
//         console.error('Error fetching and sending news as a card carousel:', error);
//     }
// }




const userCategoryPages = new Map();
const userCategoryMap = new Map();

// ...

async function sendNewsAsArticleCarousel(botId, apiKey, recipientMobile, categoryId, Tags, page = 1, articlesPerPage = 10) {
    try {
        console.log(`Fetching top news (Page ${page})...`);

        const response = await axios.get(`https://khabrimedia.com/wp-json/wp/v2/posts`, {
            params: {
                categories: categoryId,
                page: page,                  // Specify the current page number
                per_page: articlesPerPage,  // Specify the number of articles per page
            },
        });
        console.log(categoryId)

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

            const card = {
                tags: [Tags],
                title: article.title.rendered,
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

            // Stop adding articles if we have reached the desired number per page
            if (cards.length >= articlesPerPage) {
                break;
            }
        }

        await sendArticleCarouselToSwiftchat(botId, apiKey, recipientMobile, cards);

        // Update the current page for this user and category
        const userCategoryKey = `${recipientMobile}_${categoryId}`;
        userCategoryPages.set(userCategoryKey, page);

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
                    body: 'select the more option'
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
            categoryId = '70,10'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)

        }
        if (req.body.button_response.body === 'Entertainment') {
            categoryId = '48,2'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'States') {
            categoryId = '85,86,82,88,84,66,92,87,65,90,83,89'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'Sports') {
            categoryId = '49'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'Astrology') {
            categoryId = '80'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'Consumer Awareness') {
            categoryId = '81'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }
        if (req.body.button_response.body === 'Education') {
            categoryId = '11,13'
            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body)
        }


        if (req.body.button_response.body === 'More data') {
            // Get the current page for this user and category
            const userCategoryKey = `${req.body.from}_${categoryId}`;
            console.log('userCategoryKey', userCategoryKey)
            const currentPage = userCategoryPages.get(userCategoryKey) || 1;

            await sendNewsAsArticleCarousel(botId, apiKey, req.body.from, categoryId, req.body.button_response.body, currentPage + 1);
        }

        if (req.body.button_response.body === 'Select Category') {
            await buttonMessage(botId, req.body.from, apiKey)
        }

        if (req.body.button_response.body !== 'Select Category') {
            await dropdownButton(botId, req.body.from, apiKey)
        }








    }

});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});













