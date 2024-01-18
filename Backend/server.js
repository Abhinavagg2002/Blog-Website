const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express');
const { spawn } = require('child_process');
const multer = require('multer');
const path = require('path');
const cors = require("cors");

const storage = multer.memoryStorage(); // You can customize storage as needed
const upload = multer({ storage: storage });

dotenv.config({path:'./config.env'})
const fs=require("fs")
const bodyParser=require('body-parser')

const Entry = require('./schemas/EntrySchema');
const Exit = require('./schemas/ExitSchema');

db = process.env.DATABASE;
pass = process.env.PASSWORD;
port = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());


mongoose.connect(db)
.then(()=> console.log("monogdb connected"))
.catch((err)=>console.log("not connected"));


app.post('/login', async(req,res)=>{
  const {password} = req.body;
  if(password === pass){
      res.status(200).json('verification successful')
  }
  else{
      res.status(400).json('incorrect credential')
  }
})

app.post('/entry',async(req,res)=>{
  const {number,day,date,entryTime} = req.body;
  try{
      const entrydoc = await Entry.create({number,day,date,entryTime});
      res.json('vechicle successfully captured. Vehicle can enter.')
  } catch(err){
      res.status(400).json('Not able to capture entry of vehicle')
  }
})

app.post('/exit', async(req,res)=>{
  const {number,exitTime} = req.body;
  
  try{
      const {day,date,entryTime} = await Entry.findOne({number});
      const exitdoc = await Exit.create({number,day,date,entryTime,exitTime});
      await Entry.deleteOne({number});
      res.json('vehicle successfully captured. Vehicle can exit.')
  } catch(err){
      res.status(400).json('Not able to capture exit of vehicle')
  }
})

app.get('/data/:id', async(req,res)=>{
  const {id} = req.params
  const exit = await Exit.aggregate([
      {
          $group:{
              _id:`$${id}`,
              count:{$sum:1},
          },
      },
  ])
  const entry = await Entry.aggregate([
      {
          $group:{
              _id:`$${id}`,
              count:{$sum:1},
          },
      },
  ])
  let obj = {};
  entry.forEach((item,ind)=>{
      if(item._id in obj){
          obj[item._id] = obj[item._id] + item.count
      }
      else{
          obj[item._id] = item.count
      }
  })
  exit.forEach((item,ind)=>{
      if(item._id in obj){
          obj[item._id] = obj[item._id] + item.count
      }
      else{
          obj[item._id] = item.count
      }
  })
  for(let i=0;i<7;i++){
      if(i in obj){

      }
      else{
          obj[i] = 0;
      }
  }
  // console.log(exit)
  // console.log(entry)
  //console.log(obj)
  res.status(200).json(obj)

})

// app.get('/data/date', async(req,res)=>{
//     res.json(
//         await Exit.aggregate([
//             {
//                 $group:{
//                     _id:`$${date}`,
//                     count:{$sum:1},
//                 },
//             },
//         ])
//     )
// })

app.post('/NumberPlate', upload.single('image'), (req, res) => {
  const image = req.file;

  // Call the function to process the image with Python script
  processImageWithPython(image, (error, result) => {
    if (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Image processed successfully:', result);
    
      res.json({ result });
    }
  });
});

app.post('/EmptyParkingSlot', upload.single('image'), (req, res) => {
  const image = req.file;
  processImageWithPython2(image, (error, result) => {
    if (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    } else {
    console.log('Image processed successfully:', );
    const lines = result.split('\n');
    const lastLine = lines[lines.length - 2];
    console.log(lastLine)
    res.json({lastLine});
    }
    });
  // try {
  //   const pythonProcess = spawn('python', ['parking.py']);

  //   pythonProcess.stdin.write(image.buffer);
  //   pythonProcess.stdin.end();

  //   let imageData = '';

  //   pythonProcess.stdout.on('data', (data) => {
  //       // Capture the image data from stdout
  //       imageData += data.toString();
  //   });
  //   console.log('hi1')
  //   pythonProcess.on('close', (code) => {
  //       if (code === 0) {
  //           // Process completed successfully
  //           console.log('hi')
  //           res.json({imageData})
  //       } else {
  //           console.error(`Python script exited with code ${code}`);
  //           res.status(500).send('Internal Server Error');
  //       }
  //   });
//}
    
});

// Function to process the image with a Python script
function processImageWithPython(image, callback) {
  const pythonProcess = spawn('python', ['ANPR.py']);

  // Send image data to the Python script
  pythonProcess.stdin.write(image.buffer);
  pythonProcess.stdin.end();

  let outputData = '';

  pythonProcess.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      callback(null, outputData);
    } else {
      callback(`Python script exited with code ${code}`, null);
    }
  });
}

function processImageWithPython2(image, callback) {
  const pythonProcess = spawn('python', ['parking.py']);

  // Send image data to the Python script
  pythonProcess.stdin.write(image.buffer);
  pythonProcess.stdin.end();

  let outputData = '';

  pythonProcess.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      callback(null, outputData);
    } else {
      callback(`Python script exited with code ${code}`, null);
    }
  });
}


app.listen(port, () => {
  console.log('Server is running on port', port);
});