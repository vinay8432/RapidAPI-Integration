const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const { connectDB } = require('./config/database')
const { startCronJobs } = require('./src/services/cronjob');
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3001

connectDB()

// Start scheduled tasks
startCronJobs();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

const authRoutes = require('./src/routes/authRoutes')
const fundRoutes = require('./src/routes/fundRoutes')
const portfolioRoutes = require('./src/routes/portfolioRoutes')

app.use('/api/auth',authRoutes)
app.use('/api/funds',fundRoutes)
app.use('/api/portfolio',portfolioRoutes)

app.get('/health', (req, res)=>{
    res.status(200).json({"message": "Health is OK"})
})

app.use((req,res,next) => {
    res.status(404).json({message: 'Routes not Found'})
})
app.use((err, req, res, next) => {
    console.error(err.stack); // Logs the error
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})