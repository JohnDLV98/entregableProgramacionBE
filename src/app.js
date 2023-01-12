const express = require('express');
const apiRoutes = require('./routers/app.routers');

const PORT = 8080;
const app = express();
    


    //Middlewares
        app.use(express.json()); //Middleware incorporado
        app.use(express.urlencoded({ extended: true })); //Middleware incorporado


    //Routes
        app.use('/api', apiRoutes);

        app.use((error, req, res, next) => {
            res.status(500).json({
                status: "Error",
                error: error
            });
        });

    // Listen    
        app.listen(PORT, () => {
            console.log("Listening on Port => ", PORT);
        });  

   