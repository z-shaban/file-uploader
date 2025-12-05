import { Router } from "express";
import multer from "multer";
import { createFolder, dashboard, deleteFolder, updateFolder } from "../controllers/dashboardController";

const dashboardRouter = Router();
const upload = multer({dest: 'uploads/'})

dashboardRouter.get('/', dashboard)

dashboardRouter.post('/upload-file', upload.single('file'), (req,res)=>{
    res.redirect('dashboard')
})

dashboardRouter.post('/folder', createFolder)

dashboardRouter.post('/update-folder/:id', updateFolder)

dashboardRouter.get('/delete-folder/:id', deleteFolder)


export {dashboardRouter}