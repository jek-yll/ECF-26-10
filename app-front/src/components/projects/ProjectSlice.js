import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { BASE_API_URL } from "../../api/api"
import axios from "axios"

export const getAllProjects = createAsyncThunk(
    "project/getAllProjects",
    async() => {
        try {
            const response = await axios.get(`${BASE_API_URL}/projects`)

            if (response.status !== 200) {
                throw new Error ("Something went wrong during the GET request")
            }

            const data = await response.data
            return data

        } catch(error) {
            console.error(error)
        }
    }
)

export const getAProjectById = createAsyncThunk(
    "project/getAProjectById",
    async (projectId) => {
        try {
            const response = await axios.get(`${BASE_API_URL}/projects/${projectId}`)

            if (response.status !== 200) {
                throw new Error ("Someting went wrong during the GET request")
            }

            const data = await response.data
            return data

        } catch(error) {
            console.error(error);
        }
    }
)

export const addProject = createAsyncThunk(
    "project/addProject",
    async (project) => {
        try {
            const response = await axios.post(`${BASE_API_URL}/projects`, project)
            const data = await response.data
            return data 
        } catch (error) {
            console.error(error);
        }
    }
)

export const editProject = createAsyncThunk(
    "project/editProject",
    async({ projectId, project }) => {
        const projectUpdated = {...project, id: projectId}
        try {
            const response = await axios.put(`${BASE_API_URL}/projects/${projectId}`, projectUpdated)

            if (response.status != 200) {
                throw new Error ("Something went wrong during the PUT request")
            }

            return { projectId: projectId, project: project }
        } catch (error) {
            console.error(error);
        }
    }
)

export const deleteProject = createAsyncThunk(
    "project/deleteProject",
    async (projectId) => {
        


        try {
            const response = await axios.delete(`${BASE_API_URL}/projects/${projectId}`)

            if(response.status != 200) {
                throw new Error ("Something went wrong during the DELETE request")
            }
            return projectId

        } catch(error) {
            console.error(error);
        }
    }
)

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        selectedProject: null,
        formMode: null,
        isLoading: false,
        error: null
    },
    reducers: {
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload
        },
        setFormMode: (state, action) => {
            state.formMode = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProjects.pending, (state) => {
            state.isLoading = true
            state.error = false
            state.projects = []
        })
        builder.addCase(getAllProjects.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(getAllProjects.fulfilled, (state, action) => {
            state.projects = action.payload
        })
        builder.addCase(getAProjectById.fulfilled, (state, action,) => {
            state.selectedProject = action.payload
        })
        builder.addCase(addProject.fulfilled, (state, action) => {
            state.projects.push(action.payload)
        })
        builder.addCase(editProject.fulfilled, (state, action) => {
            let foundProject = state.projects.find(p => p.id === action.payload.projectId)
            if (foundProject) {
                state.projects = [ ...state.projects.filter( p => p.id !== action.payload.projectId ), action.payload.project ]
            }
        })
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            let foundProject = state.projects.find(p => p.id === action.payload.id)
            if (foundProject) {
                state.projects = state.projects.filter( p => p.id !== action.payload.id )
            }
        })
    }
})

export const { setSelectedProject, setFormMode } = projectSlice.actions
export default projectSlice.reducer