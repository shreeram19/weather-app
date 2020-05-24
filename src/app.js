const path = require("path");
const express = require("express");
const hbs =  require("hbs");
const weather = require("./utils/weatherinfo")
const geocode = require("./utils/geocode");


const app = express();

const port = process.env.PORT || 3000;

const staticFiles = path.join(__dirname,"../public");
const tempaltePath = path.join(__dirname,"../templates/views");
const partialpath =  path.join(__dirname,"../templates/partials");
app.use(express.static(staticFiles));

app.set("view engine","hbs");
app.set("views",tempaltePath);
hbs.registerPartials(partialpath);

app.get("",(req,res)=>{
    res.render("index",{
        title: "Weather App",
        name: "Shreeram P"
    });
})
app.get("/help",(req,res)=> {
    res.render("help",{
        title: "Help Page!",
        name: "Shreeram"
    });
});
app.get("/about",(req,res)=> {
    res.render("about",{
        title: "About Me",
        link: "img/robot.png",
        name:"Shreeram P"
        
    });
});
app.get("/weather",(req,res)=> {

    if(!req.query.address){
        return res.send({
            error:"Must provide Address"
        });
    }
    let address = req.query.address;
    geocode(address,(e,r)=> {
        if (e) {
            return res.send({
                error:"Unable to Connect to GeoCode"
            });
        } else if (r.statusCode != 200) {
            return res.send({
                error:"Must provide valid Address"
            });
        }
        let {body:data} = r;
        
        
        if (data.features.length === 0) {
            return res.send({
                error:`Cannot find the coordinates for ${address}`
            });
           
        } 
        let {center = {}}= data.features[0];
            console.log(`Long: ${center[0]}`);
            let long = center[1]
            console.log(`Lat: ${center[1]}`);
            let lat = center[0];
            weather(long, lat, (e, response) => {
                const data = response.body;
                let {region} = data.location;
                let {current} = data;
                return res.send({
                    address: address,
                    long: long,
                    lat: lat,
                    region: region,
                    current : current
                });
                
            });
        
    });
   
});
app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Shreeram P",
        error: "Help Page not found",
        c: "orange"
    });
});

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Shreeram P",
        error: "Page not found",
        c: "red"
    });
});
app.listen(port,()=> {
    console.log("Server started");
})