const express = require('express');
const app = express();
const path = require('path')

const PORT = 3000;

// make the file accessible to nodejs
app.use(express.static(path.join(__dirname, 'client/build')))

// send the file to any route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build/index.html', (error) => {
//         if(error){
//             res.status(500).send(error)
//         }
//     }))
// })

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})