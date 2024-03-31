const express = require('express');
const db = require('./models');
const cors = require('cors')

const app = express();

//Middlewares
const corsOptions = {
  origin: ["https://lucid-growth-assignment-frontend.vercel.app"],
  credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routers
const dnsRouter = require('./routes/dnsRouter.js');
const userRouter = require('./routes/userRouter.js')
app.use('/api/dns', dnsRouter)
app.use('/api/user', userRouter)

app.listen({port: 5000}, async( )=> {
    console.log('server up on port 5000');
    await db.sequelize.sync({force: false});
    console.log('Database resynced');
})
