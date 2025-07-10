const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

const supabase = require('@supabase/supabase-js')
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const conn = supabase.createClient(supabaseUrl, supabaseKey)

const PORT = 8080

app.get('/', (req, res) => {
    console.log('hello')
})

app.post('/oauth_signin', async (req, res) => {
    const { data, error } = await conn.from('users').select('*')

    if (error) {
        res.send(error)
        return
    }

    if (data) {
        res.send(data)
        return
    }
})

app.listen(PORT, () => {
    console.log(`|| SERVER STARTED ON ${PORT} ||\n`)
})