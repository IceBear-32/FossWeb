const express = require('express')
const app = express()
const supabase = require('@supabase/supabase-js')

const PORT = 8080

app.get('/', (req, res)=> {
    console.log('hello')
})

app.post('/oauth_signin', (req, res) => {
    console.log(req.body)
    
})

app.listen(PORT, () => {
    console.log(`|| SERVER STARTED ON ${PORT} ||\n`)
})