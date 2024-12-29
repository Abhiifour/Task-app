import express from "express";
import cors from "cors";

import jwt from 'jsonwebtoken'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret_key = '12345678'

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


let length = 0;

// Middle wares 

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ msg: "Authorization header is missing" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
    if (!token) {
        return res.status(401).json({ msg: "Token is missing" });
    }

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: "Token is invalid" });
        }
        req.user = decoded; // Add decoded user info to the request object
        next();
    });
}

//Login

app.post('/login', async(req,res) => {
    try {
        const data = await prisma.user.findFirst({
            where:{
                email:req.body.email,
                password:req.body.password
            }
        })

        if(data){
            const token =  jwt.sign(req.body.email,secret_key)
            
            console.log(token)
            return res.json({
                name:data.name,
                email:data.email,
                id:data.id,
                token : token
            });
        }
        

        return res.json({
            msg : 'user not found'
        })

    } catch (error) {
        console.log(error)
    }
})


// Signup


app.post('/signup', async(req,res) => {
    try {
        const data = await prisma.user.create({
            data:{
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            }
        })
        if(data){
            jwt.sign(req.body.email,secret_key)
            return res.json(data);
        }

    } catch (error) {
        console.log(error)
    }
})


// get all tasks
app.get('/', verifyToken,async (req ,res)=>{
    try {
        const data = await prisma.task.findMany()
        length = data.length;
        return res.json(data)
    } catch (error) {
        console.log(error)
    }
})


// create task

app.post('/create', verifyToken,async(req ,res)=>{
    try {
        await prisma.task.create({
            data:{
                title:req.body.title,
                priority:req.body.priority,
                status:req.body.status,
                startTime: new Date(req.body.startTime),
                endTime: new Date(req.body.endTime)
            }
        })
        return res.json({
            msg:"Added Sucessfully"
        })
       
    } catch (error) {
       console.log(error)
    }
    
  
})

// find task

app.post('/find',verifyToken,async (req ,res)=>{
    try {
        const data = await prisma.task.findFirst({
            where:{
                id : req.body.id
            }
        })
        return res.json(data)
    } catch (error) {
        console.log(error)
    }
})


//update task

app.put('/update',verifyToken,async (req ,res)=>{
    try {
        const data = await prisma.task.update({
            where : {
                id : req.body.id
            },
            data:{
                title:req.body.title,
                priority:req.body.priority,
                status:req.body.status,
                startTime:new Date(req.body.startTime),
                endTime:new Date(req.body.endTime)
           }
        })
        return res.json(data)
    } catch (error) {
        console.log(error)
    }
})

// delete task

app.post('/delete',verifyToken, async(req ,res)=>{
   try {
    await prisma.task.delete({
        where:{
            id : req.body.id
        }
    })
   } catch (error) {
    console.log(error)
   }
})


app.get('/summary',verifyToken,async(req,res)=>{
    const pendingCount = await prisma.task.count({
        where:{
            status : 'pending'
        }
    })

    const completedCount = await prisma.task.count({
        where:{
            status : 'finished'
        }
    })

    const pendingPercentage = (pendingCount / length) * 100;
    const completedPercentage = (completedCount / length) * 100;

    return res.json({
        length,
        pendingCount,
        pendingPercentage,
        completedPercentage
    })
})



app.listen(3000,()=>{
    console.log("server started on 3000");
})