const express = require('express')
const app = express()
const mongosee = require('mongoose')
const dbConfig = require('./config/dbConfig')

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

mongosee.connect(dbConfig.mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Berhasil konek ke mongodb")
}).catch(err => {
    console.log(err)
})

app.get('/', function (req, res) {
    res.send('Selamat datang di API')
})

app.use('/users', require('./routes/userRoutes'))

// => http://localhost:3000/data-mahasiswa/10101010/Andre
// app.get('/data-mahasiswa/:npm/:nama/:alamat', function (req, res) {
//     res.json({
//         npm: req.params.npm,
//         nama: req.params.nama,
//         alamat: req.params.alamat
//     })
// })
// //http://localhost:3000/data-mahasiswa-query?npm=101010&nama=Andre
// app.get('/data-mahasiswa-query', function (req, res) {
//     res.json({
//         npm: req.query.npm,
//         nama: req.query.nama,
//         alamat: req.query.alamat
//     })
// })

// app.post('/data-mahasiswa', function (req, res) {
//     res.json({
//         npm: req.body.npm,
//         nama: req.body.nama,
//         alamat: req.body.alamat
//     })
// })

// app.post('/test/:npm', function (req, res) {
//     res.json({
//         npm: req.params.npm,
//         nama: req.query.nama,
//         alamat: req.body.alamat
//     })
// })

const port = 3000
app.listen(port, () => {
    console.log('Server berjalan di port ' + port)
})