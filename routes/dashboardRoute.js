import { Router } from "express";
import multer from "multer";

const dashboardRouter = Router();
const upload = multer({dest: 'uploads/'})

dashboardRouter.get('/', (req,res)=>{
    res.render('dashboard')
})

dashboardRouter.post('/', upload.single('file'), (req,res)=>{
    res.redirect('dashboard')
})


export {dashboardRouter}