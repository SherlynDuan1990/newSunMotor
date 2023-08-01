const app= require("./app")
const connectDatabase= require("./config/database")

require('dotenv').config({path: './backend/config/config.env'})

//connection to database
connectDatabase()

const server=app.listen(process.env.PORT, ()=> {
    // in JS, string interpolation is achieved using backticks (```) instead of single quotes (') or double quotes (").
      console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
    })