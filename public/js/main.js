console.log("Client side JS loaded");

function submitForm(e){
    e.preventDefault();
    let location = document.querySelector("input").value;
    let p1 = document.querySelector("#mess1");
    let p2= document.querySelector("#mess2");
    let p3= document.querySelector("#mess3");
    let icon= document.querySelector(".icon");
    debugger;
    p1.innerText = "Loading ...."
    p2.innerText = ""
    p3.innerText = ""
    icon.style.display = "none";
    fetch(`http://localhost:3001/weather?address=${location}`).then((res)=>{
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