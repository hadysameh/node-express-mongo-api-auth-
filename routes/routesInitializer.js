const userRouter = require('./user')


function initializeRoutes(app){
    app.use("/api", userRouter);
}

module.exports={initializeRoutes}