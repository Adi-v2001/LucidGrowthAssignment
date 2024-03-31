const express = require('express');
const db = require('./models');
const cors = require('cors')

const app = express();

//Middlewares
const corsOptions = {
  origin: [process.env.FRONTEND_URL]
}
app.use(cors())
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routers
app.use('/', (req, res) => {
  res.send('server is running')
})
const dnsRouter = require('./routes/dnsRouter.js');
const userRouter = require('./routes/userRouter.js')
app.use('/api/dns', dnsRouter)
app.use('/api/user', userRouter)

app.listen({port: 5000}, async( )=> {
    console.log('server up on port 5000');
    await db.sequelize.sync({force: false});
    console.log('Database resynced');
})
