const express = require('express');
const logger = require('morgan');
const groupsRouter = require('./routes/band');
const idolsRouter = require('./routes/idols');
const videosRouter = require('./routes/videos');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.get("/", (req, res) => {
    res.json( "BackEnd server for K-POP Artist REST API");
    })

    const swaggerDefinition = {
        info: {
            title: 'K-POP API',
            version: '1.0.0',
            description: 'A simple API for managing K-POP artist information'
        },
        host: 'localhost:8900',
        basePath: '/'
    };
    
    const options = {
        swaggerDefinition,
        apis: ['./routes/*.js']
    };
    
    const swaggerSpec = swaggerJsdoc(options);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/public", express.static(__dirname + '/public'));
app.use("/groups", groupsRouter);
app.use("/idols", idolsRouter);
app.use("/videos", videosRouter);



app.use((req, res) =>
 res.status(404).send("Sorry page not found!"));
 
module.exports = app;