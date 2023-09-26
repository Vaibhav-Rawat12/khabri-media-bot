const express = require('express');
const app = express();
const port = 8000; 
app.use(express.json());

const routes = require('./Router/route'); 
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});







