import { createBrowserRouter } from "react-router-dom"
import ProjectForm from "./components/projects/ProjectForm"
import App from "./App"
import ProjectDetails from "./components/projects/ProjectDetails"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/project/:mode",
        element: <ProjectForm/>
    },
    {
        path: "/project/details/:id",
        element: <ProjectDetails/>
    },
])

export default router
