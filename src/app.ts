import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT,() => {
    console.log(`server is listing at port :- ${PORT}`);
})