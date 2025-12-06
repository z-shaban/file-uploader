import { Router } from "express";
import multer from "multer";
import { createFolder, dashboard, deleteFile, deleteFolder, downloadFile, openFolder, updateFolder, uploadFile } from "../controllers/dashboardController";

const dashboardRouter = Router();
const upload = multer({dest: 'uploads/'})

dashboardRouter.get('/', dashboard)

dashboardRouter.post('/upload-file', upload.single('file'), uploadFile)

dashboardRouter.post('/folder', createFolder)

dashboardRouter.post('/update-folder/:id', updateFolder)

dashboardRouter.get('/delete-folder/:id', deleteFolder)

dashboardRouter.get('/folder/:id',openFolder)

dashboardRouter.get('/folder/download-file/:id', downloadFile)

dashboardRouter.get('/folder/delete-file/:id', deleteFile)


export {dashboardRouter}