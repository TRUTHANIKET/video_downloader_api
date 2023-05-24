const express=require("express")
const ytdl = require("ytdl-core")


const app=express()
app.use(express.json())

app.get("/",(req,res)=>{res.send("i am working")})


app.post("/video",async(req,res)=>{
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
console.log(videourl)
res.status(200).json(store)
})


app.listen(3000,()=>{console.log(`server running on http://localhost:3000`)})