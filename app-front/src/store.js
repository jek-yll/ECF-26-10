import { configureStore } from "@reduxjs/toolkit";
import ProjectSlice from "./components/projects/ProjectSlice";

export default configureStore({
    reducer: {
        project: ProjectSlice
    }
})