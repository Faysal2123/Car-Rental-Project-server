const express=require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors=require('cors')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const app=express()
require('dotenv').config();
const port=process.env.PORT || 5000

app.use(cors({
  origin:['http://localhost:5175'],
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())

const verifyToken=(req,res,next)=>{
  const token=req.cookies?.token

  if(!token){
    res.send.status(401).send({message:'unauthorized access'})
  }
  jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err){
      return res.status(401).send({message:'unauthorized access'})
    }
    req.user=decoded
    next()
  })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.erebr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database=client.db("carPortal")
    const carsCollection=database.collection("car-collection")
    const bookingCollection=database.collection('booking-collection')
    app.post('/jwt',async(req,res)=>{
      const user=req.body
      const token=jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'1hr'});    
      res.cookie('token',token,{
        httpOnly:true,
        secure:false
      })
      .send({success:true})
    })
    app.post('/logout',async(req,res)=>{
      res.clearCookie('token',{
        httpOnly:true,
        secure:false
      })
      .send({success:true})
    })
    app.get('/cars',async(req,res)=>{
      const cursor=carsCollection.find()
      const result=await  cursor.toArray()
      res.send(result)
    })
    app.get('/cars/email',verifyToken,async(req,res)=>{
      const email=req.query.email;
      const query={userEmail:email}
      if(req.user.email !== req.query.email){
        return res.status(403).send({message:'forbidden'})
      }
      const result=await carsCollection.find(query).toArray()
      res.send(result)
    })

    app.get('/cars/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id: new ObjectId(id) };
      const result=await carsCollection.findOne(query)
      res.send(result)

    })
    app.post('/cars',async(req,res)=>{
      const addCar=req.body;
      const result=await carsCollection.insertOne(addCar)
      res.send(result)
    })
    app.delete('/cars/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id : new ObjectId(id)}
      const result=await carsCollection.deleteOne(query)
      res.send(result)
    })
    app.put('/cars/:id',async(req,res)=>{
      const { id } = req.params;
      const updateCar=req.body

      const result=await carsCollection.updateOne(
        {_id : new ObjectId(id)},
        {$set:updateCar}
      );
      res.send(result)
      
    })
    
    app.post('/bookings',async(req,res)=>{
      const booking=req.body
      if(!booking.carModel || !booking.userEmail){
        return res.status(400).send({message:'Missing required fields'})
      }
      const result=await bookingCollection.insertOne(booking)
      const carQuery={model: booking.carModel};
      const updateResult=await carsCollection.updateOne(
        carQuery,
        {$inc:{bookingCount:1}}
      )
      res.send(result)
      
    })
    
    app.get('/bookings',async(req,res)=>{
      const email=req.query.email
      const query={userEmail:email};
      const bookings=await bookingCollection.find(query).toArray()
      res.send(bookings)
    })
    app.delete('/bookings/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id: new ObjectId(id)}
      const result=await bookingCollection.deleteOne(query)
      res.send(result)
    })
   
    app.put('/bookings/:id',async(req,res)=>{
      const bookingId=req.params.id;
      const { newDate } = req.body;

      const result = await bookingCollection.updateOne(
        { _id: new ObjectId(bookingId) }, 
        { $set: { bookingDate: new Date(newDate) } }
      );
    
      res.send(result.matchedCount === 0 ? { message: 'Booking not found' } : { message: 'Booking date updated successfully' });
    })
    




    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', async(req,res)=>{
    res.send("your application is running")
})
app.listen(port,()=>{
    console.log(`your application is running:${port}`)
})
