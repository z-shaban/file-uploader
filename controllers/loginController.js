import {body, validationResult, matchedData} from 'express-validator'
import {prisma} from '../lib/prisma'
import bcrypt from 'bcryptjs'

function loginForm(req,res){
    res.render('login')
}

/*const validateUser = [
     body('username')
        .trim()
        .notEmpty().withMessage('Username cannot be empty')
        .bail()
        .isLength({min:2}).withMessage('username must have at least 2 letters')
        .bail()
        .custom(async(value)=>{
           const username = await prisma.user.findUnique({
            where: {username: value}
           })
           if(username){
            throw new Error('username exists, choose another username')
           }
           return true;
        }),

        body('password')
       .notEmpty().withMessage('password cannot be empty')
       .bail()
       .isLength({min:8}).withMessage('password must have at least 8 letters'),
]

const signup = [
    validateUser,
    async(req,res)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.render('signup',{errors:errors.array()})
        }

        const{username,password}= matchedData(req)
        try{
           const hashedPassword = await bcrypt.hash(password,10)
           await prisma.user.create({
            data:{
                username: username,
                password: hashedPassword
            }
             })
            res.redirect('/')
        }catch(error){
         res.status(500).render('signup', {errors:[{msg: 'Server error please try again'}]})
         console.log(error)
        }
       
       
    }
]*/



export {loginForm}