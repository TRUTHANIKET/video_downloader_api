const express=require("express")
const ytdl = require("ytdl-core")
const cors=require("cors")
const serverless=require("serverless-http")

const router = express.Router();
const app=express()
app.use(cors());
app.use(express.json())

router.all('/', (req, res) => {
    console.log("Just got a request!")
    res.json("send the post request to /video endpoint and include url param in the body of post");
})


router.post("/video",async(req,res)=>{
try{
    const url=await req.body.url
const videoid=await ytdl.getURLVideoID(url)
const meta=await ytdl.getBasicInfo(url)
const store=meta.formats
const quality=await store.map(r=>{
    return(r.qualityLabel)
})

const videourl=await store.map(r=>{
    return(`${r.url} and ${r.qualityLabel} `)
})
console.log("request worked")
res.status(200).json(store)
}catch(e){
    console.log(e.message)
    res.status(500).json([{qualityLabel:"error check your url",url:"somethings wrong",mimeType:":)"}])
}
})


app.use(`/.netlify/functions/api`, router);
module.exports = app;
module.exports.handler = serverless(app);