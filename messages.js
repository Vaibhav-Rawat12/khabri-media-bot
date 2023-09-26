const axios = require("axios");


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
        console.log('page', page)

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

            const cleanedString = article.excerpt.rendered.replace(/<\/?p>/g, '');

            const card = {
                tags: [Tags],
                title: truncatedTitle,
                description: cleanedString,
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


module.exports = {
    handleCustomMessage,
    dropdownButton,
    sendArticleCarouselToSwiftchat,
    sendNewsAsArticleCarousel,
    buttonMessage,
  };