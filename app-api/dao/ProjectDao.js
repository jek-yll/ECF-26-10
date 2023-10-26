import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path"

export class ProjectDao {
    constructor(){
        this.file = resolve("./data/db.json")
        this.projects = []
    }

    readFile() {
        const file = readFileSync(this.file, { encoding: "utf-8" });
        this.projects = JSON.parse(file);
      }

    writeFile() {
      writeFileSync(this.file, JSON.stringify(this.projects));
    }

    getAll(){
        return this.projects
    }

    save(project){
        project.id = uuidv4()
        this.projects.push(project)
        this.writeFile()
        return project
    }

    findById(id){
        return this.projects.find((p) => p.id === id)
    }

    deleteProject(id){
        this.projects = this.projects.filter((p) => p.id !== id)
        this.writeFile()
    }

    updateProject(projectUpdate) {
        const project = this.findById(projectUpdate.id)
        if (project === undefined){
            return false
        }
        project.title = projectUpdate.title
        project.description = projectUpdate.description
        project.startDate = projectUpdate.startDate
        project.endDate = projectUpdate.endDate
        project.statut = projectUpdate.statut

        this.writeFile()
        return true
    }
}