const express=require("express")
const ytdl = require("ytdl-core")
const cors=require("cors")

const app=express()
app.use(cors(
    {
        origin:"*"
    }
));
app.use(express.json())

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.json("send the post request to /video endpoint and include url param in the body of post");
})


app.post("/video",async(req,res)=>{
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

app.listen(process.env.PORT || 5000)
