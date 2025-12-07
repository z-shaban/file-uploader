import {prisma} from '../lib/prisma'
import { v2 as cloudinary } from 'cloudinary'
import { promises as fs } from 'fs';

async function dashboard(req,res) {
    
    const folders = await prisma.folder.findMany()
    if(folders){
      res.render('dashboard', {folders})
    }else{
        res.render('dashboard')
    }
    
}

async function createFolder(req,res) {
    try{
        const folder = await prisma.folder.findUnique({
            where: {foldername: req.body.foldername}
        })
       
        if(folder){
            res.render('dashboard',{errors:[{msg: 'Folder already exist please try again'}]})
        }
       await prisma.folder.create({
        data: {
            foldername : req.body.foldername,
            creatorId : req.user.id
        }
       })
       res.redirect('/dashboard')
    }catch (error){
         res.status(500).render('dashboard', {errors:[{msg: 'Server error please try again'}]})
         console.log(error)
    }
}

async function updateFolder(req,res) {
    
    await prisma.folder.update({
        where:{id: +req.params.id},
        data:{foldername: req.body.foldername}
    })
    res.redirect('/dashboard')
}

async function deleteFolder(req,res) {
    await prisma.folder.delete({
        where:{id: +req.params.id}
    })
   res.redirect('/dashboard')
}

async function openFolder(req,res){
  const folderId = +req.params.id
  const files = await prisma.file.findMany({
    where: {folderId: folderId}
  })
  if (files){
     res.render('folder', {files, folderId})
  } else{
    res.render('folder')
  }
 
}

async function uploadFile(req,res){

   const options  = {
    folder: 'file-uploader',
      resource_type: 'auto', 
      use_filename: true,
      unique_filename: true
    
   }

   try{
     const result = await cloudinary.uploader.upload(req.file.path,options)
     console.log(result)

      const kb = (req.file.size / 1024).toFixed(2);
    await prisma.file.create({
        data:{
            filename:req.file.originalname,
            size: kb + 'KB',
            url: result.secure_url,
            cloudinaryId: result.public_id,
            folderId : +req.body.folderId
        }
    })
     await fs.unlink(req.file.path);
   }catch(error){
      console.error(error)
   }


   
    res.redirect('/dashboard')
}

async function downloadFile(req,res){
    const file = await prisma.file.findUnique({
        where:{
            id : +req.params.id
        }
    })
    res.download(file.url)
}

async function deleteFile(req,res){
     const file = await prisma.file.findUnique({
        where:{
            id : +req.params.id
        }
    })

    await cloudinary.uploader.destroy(file.cloudinaryId, {
      resource_type: 'raw' 
    });

    await prisma.file.delete({
        where:{
            id : +req.params.id
        }
    })
   res.redirect(`/dashboard/folder/${file.folderId}`)
}


export {createFolder, dashboard, updateFolder,deleteFolder, openFolder, uploadFile, downloadFile,deleteFile}