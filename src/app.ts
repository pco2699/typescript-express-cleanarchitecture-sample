import express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

export default app;
