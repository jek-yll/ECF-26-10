import { useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProject, editProject, setFormMode, setSelectedProject } from "./ProjectSlice";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mode = useSelector(state => state.project.formMode)
    const projectSelected = useSelector(state => state.project.selectedProject)

    const titleRef = useRef()
    const descriptionRef = useRef()
    const startDateRef = useRef()
    const endDateRef = useRef()
    const statutRef = useRef()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const title = titleRef.current.value
        const description = descriptionRef.current.value
        const startDate = startDateRef.current.value
        const endDate = endDateRef.current.value
        const statut = statutRef.current.value

        const newProject = {
            title, description, startDate, endDate, statut
        }

        if (mode === 'add') {
            dispatch(addProject(newProject))
        } else if ( mode === 'edit') {
            dispatch(editProject({projectId: projectSelected.id, project: newProject}))
        }

        dispatch(setFormMode(""))
        dispatch(setSelectedProject(null))
        navigate("/")
    }

    const cancelModifHandler = () => {
        dispatch(setFormMode(""))
        dispatch(setSelectedProject(null))
        navigate("/")
    }

    return ( <div className="container">
        { 
            mode === "add" ? 
            <h2>Création d'un projet</h2>
            :
            <h2>Modification du projet</h2>

        }
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Nom du Projet :</Form.Label>
                <Form.Control
                    type="text"
                    placeholder=""
                    ref={titleRef}
                    defaultValue={ projectSelected ? projectSelected.title : ""}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description :</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    ref={descriptionRef}
                    defaultValue={ projectSelected ? projectSelected.description : ""}
                    required
                />
            </Form.Group>
            <Row className="d-flex my-3" >
                <Form.Group as={Col}>
                    <Form.Label>Début du projet :</Form.Label>
                    <Form.Control 
                        type="date"
                        ref={startDateRef}
                        defaultValue={ projectSelected ? projectSelected.startDate : ""}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Fin du projet :</Form.Label>
                    <Form.Control 
                        type="date"
                        ref={endDateRef}
                        defaultValue={ projectSelected ? projectSelected.endDate : ""}
                        required
                    />
                </Form.Group>
            </Row>
            <Form.Group>
                <Form.Label>Etat du projet :</Form.Label>
                <Form.Select className="me-3" ref={statutRef} required>
                    <option>{ projectSelected ? projectSelected.statut : "Etat du projet"}</option>
                    <option value="Non débuté">Non débuté</option>
                    <option value="En cours">En cours</option>
                    <option value="En attente">En attente</option>
                    <option value="Terminé">Terminé</option>
                </Form.Select>
            </Form.Group>
                {
                    mode === "add" ?
                    <div className="d-flex justify-content-end mt-3">
                        <Button className="me-2 " variant="outline-primary" type="submit">Créer</Button>
                        <Button variant="outline-dark" onClick={cancelModifHandler}> Annuler</Button>
                    </div>
                    :
                    <div className="d-flex justify-content-end mt-3">
                        <Button className="me-2" variant="outline-warning" type="submit">Modifier</Button>
                        <Button variant="outline-dark" onClick={cancelModifHandler}> Annuler</Button>
                    </div>
                }
        </Form>
    </div> );
}
 
export default ProjectForm;