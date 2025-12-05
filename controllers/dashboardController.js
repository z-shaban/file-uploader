import {prisma} from '../lib/prisma'

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
export {createFolder}