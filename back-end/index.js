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


function calculateLapsedTime(startTime) {
    // Convert startTime to a Date object
    const start = new Date(startTime);
    const current = new Date(); // Get the current time

    // If the current time is earlier than the start time
    if (current > start) {
        const timeDifference = current - start;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return days * 24 + hours; 
    }

  
    
   

    return 0;
}


function timeToFinish(startTime,endTime) {
    // Convert startTime to a Date object
    const start = new Date(startTime);
    const end = new Date(endTime); // Get the current time

    // If the current time is earlier than the start time
    if (end > start) {
        const timeDifference = end - start;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return days * 24 + hours; 
    }

  
    
   

    return 0;
}




function calculateCompletion(start , end){
    const startTime = new Date(start);
    const endTime = new Date(end);

// Calculate the difference in milliseconds
   const timeDifference = endTime - startTime;

   const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

   return days * 24 + hours;
}
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


// Summary / Analysis


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


    const data = await prisma.task.findMany()
    length = data.length;
    
    const totalCompletionTime = data
        .filter(item => item.status === 'finished')
        .map(item => calculateCompletion(item.startTime, item.endTime))
        .reduce((acc, hours) => acc + hours, 0);
    


    const totalLapsedTime = data
    .filter(item => item.status === 'pending')
    .map(item => calculateLapsedTime(item.startTime))
    .reduce((acc, hours) => acc + hours, 0);
    // console.log(totalLapsedTime)

    
    const totalTimeToComplete = data
    .filter(item => item.status === 'pending')
    .map(item => timeToFinish(item.startTime, item.endTime))
    .reduce((acc, hours) => acc + hours, 0);
     //console.log(totalTimeToComplete)

    const avg = totalCompletionTime / completedCount;
    const pendingPercentage = (pendingCount / length) * 100;
    const completedPercentage = (completedCount / length) * 100;
    

    const pendingData = data.filter(item => item.status === 'pending');

    const prioritySummary = pendingData.reduce((acc, item) => {
        const priority = item.priority;
        if (!acc[priority]) {
            acc[priority] = {
                count: 0,
                totalLapsedTime: 0,
                totalTimeToComplete: 0
            };
        }
        acc[priority].count += 1;
        acc[priority].totalLapsedTime += calculateLapsedTime(item.startTime);
        acc[priority].totalTimeToComplete += timeToFinish(item.startTime, item.endTime);
        return acc;
    }, {});

    const TaskPriority = {};
    for (let priority in prioritySummary) {
        TaskPriority[priority] = {
            count: prioritySummary[priority].count,
            totalLapsedTime: prioritySummary[priority].totalLapsedTime,
            totalTimeToComplete: prioritySummary[priority].totalTimeToComplete
        };
    }
    console.log(prioritySummary)
    console.log(TaskPriority)
       

        return res.json({
            length,
            pendingCount,
            pendingPercentage,
            completedPercentage,
            avg,
            totalLapsedTime,
            totalTimeToComplete,
            TaskPriority
        });
     
   
})



app.listen(3000,()=>{
    console.log("server started on 3000");
})