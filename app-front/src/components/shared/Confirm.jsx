import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../projects/ProjectSlice";
import { useNavigate } from "react-router-dom";


const ConfirmModal = ({show, handleClose}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const project = useSelector(state => state.project.selectedProject)

    const cancelHandler = () => {
        handleClose()
    }

    const confirmHandler = () => {
        dispatch(deleteProject(project.id))
        navigate("/")
    }

    return ( 
        <Modal show={show} onHide={handleClose}>
            <div className="d-flex flex-column p-3 align-items-center">
                <h4>Suppression du Projet : </h4>
                <h5>{project.title}</h5>
                <div className="mt-3">
                    <Button className="me-3" variant="outline-dark" onClick={cancelHandler}>Annuler</Button>
                    <Button onClick={confirmHandler} variant="outline-danger" >Confirmer</Button>
                </div>
            </div>
        </Modal>
     );
}
 
export default ConfirmModal;