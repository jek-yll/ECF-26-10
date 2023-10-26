import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { getAProjectById, setFormMode, setSelectedProject } from "./ProjectSlice";
import ConfirmModal from "../shared/Confirm";
import { useEffect, useState } from "react";

const ProjectDetails = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const { id } = useParams()

    let projectSelected = useSelector(state => state.project.selectedProject)

    const goBackBtn = () => {
        navigate("/")
        dispatch(setSelectedProject(""))
    }

    const uptProjectBtn = () => {
        dispatch(setSelectedProject(projectSelected))
        dispatch(setFormMode("edit"))
        navigate("/project/edit")
    }

    const deleteBtnHandler = () => {
        setShow(true)
    }

    const handleClose = () => setShow(false)

    return ( 
    <>
        <div className="container mt-3 border p-3 rounded shadow">
            <div className="d-flex justify-content-between">
                <h2>{projectSelected.title}</h2>
                <Button variant="outline-dark" onClick={goBackBtn}>Retour</Button>
            </div>
            <div>
                <p>{projectSelected.description}</p>
            </div>
            <div>
                <p>Etat du projet : {projectSelected.statut}</p>
            </div>
            <div className="d-flex justify-content-between">
                <span>
                    Début du projet : {projectSelected.startDate}
                </span>
                <span>
                    Fin estimé : {projectSelected.endDate}
                </span>
            </div>
            <div className="d-flex justify-content-center">
                <Button className="me-5" variant="outline-warning" onClick={uptProjectBtn}>Modifier</Button>
                <Button className="" variant="outline-danger" onClick={deleteBtnHandler}>Supprimer</Button>
            </div>
        </div> 
        <ConfirmModal show={show} handleClose={handleClose}/>
    </>
    );
}
 
export default ProjectDetails;