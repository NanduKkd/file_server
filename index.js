const express = require('express')
const multer = require('multer')
const app = express()

const dest = require('path').join(require('os').homedir(), 'files', 'uploads')

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, dest),
	filename: (req, file, cb) => {
		const name = file.originalname.substring(0, file.originalname.lastIndexOf('.'))
		const ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
		cb(null, name+'_'+Date.now()+Math.round(Math.random()*10000)+ext)
	},
})
const upload = multer({ storage })

app.post('/upload', upload.array("files"), (req, res) => {
	res.status(200).send("<html><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head><body>Uploaded. <a href=\"/sharer\">Upload Again</a></body></html>")
})

const port = 3000

app.use(express.static('public'))

app.listen(port, () => {
	console.log("Server listening on port 3000.")
})
