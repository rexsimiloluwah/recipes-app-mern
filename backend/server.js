// Main server 
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Run the Server
server.listen(PORT, () => {
    console.log(`Server is running successfully at PORT :- ${PORT}`);
})
