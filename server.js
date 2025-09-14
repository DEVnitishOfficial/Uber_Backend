
import express from 'express'
import { serverConfig } from './config/index.js'
import connectToDB from './config/dbConnection.js'
import v1Router from './routers/v1/index.router.js';
import v2Router from './routers/v2/index.router.js';
import { genericErrorHandler } from './middlewares/error.middleware.js';


const app = express();

app.use(express.json());


app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);


app.use(genericErrorHandler)



app.get('/ping', (req, res) => {
    res.send("pong")
})


app.listen(serverConfig.PORT, async() => {
    await connectToDB();
    console.log(`server is listening at port ${serverConfig.PORT}`)
})