import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Welcome API
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to DevConnect API!',
    data: {
      project: 'DevConnect',
      status: 'Backend is running',
    },
  })
})

// Health check API
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DevConnect backend is healthy',
    data: {
      status: 'OK',
    },
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DevConnect server running at http://localhost:${PORT}`)
})