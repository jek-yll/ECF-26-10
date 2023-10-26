import { ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProject } from "./ProjectSlice";


const ProjectItem = ({project}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goToDetails = () => {
        navigate(`/project/details/${project.id}`)
        dispatch(setSelectedProject(project))
    }

    return ( 
    <ListGroup.Item className="border-dark">
        <div className="d-flex justify-content-between align-items-center">
        <span>{project.title} - {project.statut}</span>
        <Button onClick={goToDetails} variant="outline-primary"><i className="bi bi-eye"></i> Détail du projet</Button>
        </div>
    </ListGroup.Item> );
}
 
export default ProjectItem;