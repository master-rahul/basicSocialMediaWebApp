const express = require('express') // fetching express modules
const app = express()

app.listen(process.env.PORT || 8000, function(error){
    if(error) console.log('Error : Launcing Express Server : ', error)
    else console.log('Success : Launching Express Server') 
})