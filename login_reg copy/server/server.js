const express = require("express")
const app = express()
const port = 8000
const cors = require("cors")
const cookieParser = require('cookie-parser');
require('dotenv').config();


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('./config/mongoose.config')


const Routes = require('./routes/user.routes')
Routes(app)





app.listen(port, () => console.log(`Welcome to the Death Star Bridge: ${port} `))




