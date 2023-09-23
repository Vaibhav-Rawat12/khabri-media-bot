const axios = require("axios");
require("dotenv").config();
const apiUrl = `https://v1-api.swiftchat.ai/api/bots/${process.env.BOT_ID}/messages`;
const apiKey = process.env.BOT_API_KEY;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};
async function sendSessionMessage() {
 
  requestBody = {
    to: "+918085540441",
    type: "text",
    text: {
      body: "",
    },
    rating_type: "thumb",
  };
  try {
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

const path = require('path');
const fs = require('fs');
const mime = require('mime'); // Import the mime module






async function sendCard(){
  const requestData = {
    to: "+918085540441",
    type: 'article',
    article: [
      {
        tags: ['Sample Tag 1'],
        title: 'Sample title',
        header: {
          type: 'image',
          image: {
            id: "https://khabrimedia.com/wp-content/uploads/2023/09/ramesh-bidhudi-mp-1.jpeg",
            body: 'Sample caption',
          },
        },
        description: 'Sample description',
        actions: [
          {
            button_text: 'Go To Website',
            type: 'website',
            website: {
              title: 'Welcome to Swiftchat',
              payload: 'qwerty',
              url: 'https://swiftchat.ai',
            },
          },
        ],
      },
    ],
  };
  

axios.post(apiUrl, requestData,{headers})
  .then((response) => {
    console.log('Message sent successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error sending message:', error);
  });

}
sendCard()


// const requestData = {
//   to: "+918085540441",
//   type: 'button',
//   button: {
//     body: {
//       type: 'text',
//       text: {
//         body: 'welcome to the quiz app ',
//       },cd
//     },
//     buttons: [
//       {
//         type: 'solid',
//         body: 'Mathematics, Class 1',
//         reply: 'Mathematics, Class 1',
//       },
//       {
//         type: 'solid',
//         body: 'Mathematics quiz, Class 1',
//         reply: 'Mathematics quiz, Class 1',
//       },
//       {
//         icon: 'registration',
//         type: 'dotted',
//         body: 'Add another student',
//         reply: 'Add another student',
//       },
//     ],
//     allow_custom_response: false,
//   },
// };
// const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${apiKey}`,
//   };
// axios.post(apiUrl, requestData,{headers})
//   .then((response) => {
//     console.log('Message sent successfully:', response.data);
//     return response.data;
//   })
//   .catch((error) => {
//     console.error('Error sending message:', error);
//   });


module.exports = sendSessionMessage;
