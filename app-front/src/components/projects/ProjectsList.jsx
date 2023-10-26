import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, setFormMode } from "./ProjectSlice";
import { Button, ListGroup, Form } from "react-bootstrap"
import ProjectItem from "./ProjectItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProjecList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const projects = useSelector( state => state.project.projects )

    const [filterMode, setFilterMode] = useState("")

    useEffect(() => {
        dispatch(getAllProjects())
    }, [])

    const filteredProjects = () => {
        if(projects.length > 0) {
            switch(filterMode) {
                case "Non débuté": 
                    return [...projects].filter(p => p.statut === "Non débuté")
                case "En cours":
                    return [...projects].filter(p => p.statut === "En cours")
                case "En attente":
                    return [...projects].filter(p => p.statut === "En attente")
                case "Terminé":
                    return [...projects].filter(p => p.statut === "Terminé")
                default: 
                    return [...projects]
            }
        } else {
            return []
        }
    }

    const addBtnHandler = () => {
        navigate('/project/add')
        dispatch(setFormMode('add'))
    }

    const filterModeChangeHandler = (event) => {
        setFilterMode(event.target.value)
    }

    return ( 
    <>
        <div className="d-flex justify-content-between">
            <h2>ProjectTracker Pro</h2>
            <div className="d-flex">
            <Form.Select 
                className="me-3" 
                id="filterMode" 
                value={filterMode} 
                onChange={filterModeChangeHandler}
            >
                <option>Etat du projet</option>
                <option value="Non débuté">Non débuté</option>
                <option value="En cours">En cours</option>
                <option value="En attente">En attente</option>
                <option value="Terminé">Terminé</option>
            </Form.Select>
            <Button variant="outline-success" onClick={addBtnHandler}><i className="bi bi-plus-lg"></i> <span>Créer un projet</span> </Button>
            </div>
        </div>
        {
            projects.length == 0 ? 
           <div>Pas de Projet en cours</div> 
           :
            <ListGroup className="mt-3 shadow-lg">
                {
                    filteredProjects().map((p, key) => (
                        <ProjectItem key={key} project={p} />
                    ))
                }
            </ListGroup>
        }
    </> );
}
 
export default ProjecList;