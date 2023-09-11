const app= require("./app")
const connectDatabase= require("./config/database")


//handle uncaught exceptions
process.on("uncaughtException", err=>{
  console.log(`ERROR: ${err.stack}`);
  console.log(`shutting down due to uncaught exception`);
  process.exit(1)

})

require('dotenv').config({path: './backend/config/config.env'})

//connection to database
connectDatabase()

const server=app.listen(process.env.PORT, ()=> {
    // in JS, string interpolation is achieved using backticks (```) instead of single quotes (') or double quotes (").
      console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
    })

//handle unhandled promise rejections
process.on("unhandledRejection", err=> {
  console.log(`ERROR: ${err.message}`);
  console.log(`shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1)
  })
})

