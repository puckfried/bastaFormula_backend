import express from 'express'



const app = express();
const port = 5000;

// Routes
app.get('/', (req, res) => {
    res.send("Server running")
    });


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
  