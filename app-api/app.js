import express from 'express'
import { projectDao, projects } from './routes/project.js'
import cors from 'cors'

const port = 3030
const app = express()

app.use(cors())
app.use(express.json())
app.use('/projects', projects)

app.listen(port, () => {
    projectDao.readFile()
    console.log(`http://127.0.0.1:${port}`);
})