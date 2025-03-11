import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';
import { startWebsocketServer } from './websockets';
dotenv.config();

const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin:'*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api',router);

app.get('/', (_,resp) => {
    resp.send(`server is up and running on port :- ${PORT}`)
})

const PORT = process.env.PORT || 5000;
server.listen(PORT,() => {
    console.log(`server is listing at port :- ${PORT}`);
})

startWebsocketServer(server);