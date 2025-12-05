import { Router } from "express";
import multer from "multer";
import { createFolder } from "../controllers/dashboardController";

const dashboardRouter = Router();
const upload = multer({dest: 'uploads/'})

dashboardRouter.get('/', (req,res)=>{
    res.render('dashboard')
})

dashboardRouter.post('/upload-file', upload.single('file'), (req,res)=>{
    res.redirect('dashboard')
})

dashboardRouter.post('/folder', createFolder)


export {dashboardRouter}