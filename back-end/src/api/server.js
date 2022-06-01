require('dotenv/config');
const app = require('./app');

const PORT = process.env.API_PORT;

app.listen(PORT, () => console.log('Listening on port', PORT));
