console.log("Client side JS loaded");

function getWeather() {
    if(!navigator.geolocation){
        return alert("Your browser does not support geo location. Enter you location name in the below form")
    }
    let p1 = document.querySelector("#mess1");
    let p2= document.querySelector("#mess2");
    let p3= document.querySelector("#mess3");
    let icon= document.querySelector(".icon");
    p1.innerText = "Loading ....";
    p2.innerText = "";
    p3.innerText = "";
    icon.style.display = "none";
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
    let long = position.coords.longitude;
    fetch(`/currentWeather?lat=${lat}&long=${long}`).then((res)=>{
        res.json().then((data)=> {
            p1.value ="";
            if(data.error){
                p1.innerText = data.error;
                
            } else {
                p1.innerText= `Region:${data.region}`;
                p2.innerText=`Its ${data.current.weather_descriptions[0]}`; 
                p3.innerText=`Temprature is ${data.current.temperature} but it feels like ${data.current.feelslike}`;
                icon.setAttribute("src",data.current.weather_icons[0]);
                icon.style.display = "block";
            }
        })
    });
    })
    

}


function submitForm(e){
    e.preventDefault();
    let location = document.querySelector("input").value;
    let p1 = document.querySelector("#mess1");
    let p2= document.querySelector("#mess2");
    let p3= document.querySelector("#mess3");
    let icon= document.querySelector(".icon");
    p1.innerText = "Loading ....";
    p2.innerText = "";
    p3.innerText = "";
    icon.style.display = "none";
    fetch(`/weather?address=${location}`).then((res)=>{
    res.json().then((data)=> {
        p1.value ="";
        if(data.error){
            p1.innerText = data.error;
            
        } else {
            p1.innerText= `Region:${data.region}`;
            p2.innerText=`Its ${data.current.weather_descriptions[0]}`; 
            p3.innerText=`Temprature is ${data.current.temperature} but it feels like ${data.current.feelslike}`;
            icon.setAttribute("src",data.current.weather_icons[0]);
            icon.style.display = "block";
        }
    })
});
}