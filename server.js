import express from 'express'
import processData from './processData.js';
import cors from 'cors'



const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

// Routes
app.get('/', (req, res) => {
    res.send("Server running")
    });
app.post('/contactform', processData)

// Start Webserver
app.listen(port, () => {
    console.log(`Now listening on port ${port} `);
});


//  Error handling
app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || 400).send({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  });
  
  process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1); // mandatory (as per the Node.js docs)
  });