import express from 'express'
import { ProjectDao } from '../dao/ProjectDao.js'
import { Project } from '../models/Project.js'

export const projects = express.Router()
export const projectDao = new ProjectDao()


projects.get('/', (req, res) => {
    res.json(projectDao.getAll())
})

projects.get('/:projectId', (req, res) => {
    let project = projectDao.findById(req.params.projectId)
    
    if (project == undefined) {
        res.status(404).json({code: 404, message: "Aucun projet trouvé"})
    }

    res.json(project)
})

projects.post('/', (req, res) => {
    const { title, description, startDate, endDate, statut } = req.body
    let project = new Project(null, title, description, startDate, endDate, statut )
    res.json(projectDao.save(project))
})

projects.put('/:projectId', (req, res) => {
    const {id, title, description, startDate, endDate, statut } = req.body

    if (req.params.projectId != id){
        res.sendStatus(409)
    }

    let project = new Project( id, title, description, startDate, endDate, statut )

    projectDao.updateProject(project) ? res.sendStatus(200) : res.status(400).json({ code: 400, message: "Erreur lors de la mise à jour du projet" })
})

projects.delete('/:projectId', (req, res) => {
    projectDao.deleteProject(req.params.projectId);
    res.sendStatus(200)
})