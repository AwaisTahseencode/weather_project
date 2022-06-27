const butn=document.querySelector(".toggle_bar")
const nav=document.querySelector(".nav");
const link=document.querySelector(".list_items")
const submit=document.querySelector("#submit")
const input=document.querySelector("#input")
const message=document.querySelector(".message")
const weather_cont=document.querySelector(".weather_container")
let check=false;
const weather_all=document.querySelector(".weather_all")
const city=document.querySelector("#city");
const icon=document.querySelector(".icon");
const temp=document.querySelector(".temp");
const speed=document.querySelector("#speed");
const fahren=document.querySelector("#fahren");

butn.addEventListener("click",()=>{
    nav.classList.toggle("active")
});
const updateTimeDate=()=>{
    const days=new Array(7);
    days[0]="MON";
    days[1]="TUE";
    days[2]="WED";
    days[3]="THUR";
    days[4]="FRI";
    days[5]="SAT";
    days[6]="SUN";
    const months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const date=new Date();
    const minutes=date.getMinutes();
    let hours=date.getHours();
    if(hours>12){
        hours-=12;

    }
    const day=days[date.getDay()];
    const month=months[date.getMonth()];
    const year=date.getFullYear();
    const dte=date.getDate();
    const date_act=document.querySelector(".date");
    const time=document.querySelector(".time_actual");
    date_act.innerHTML=`${day} , ${month}/${dte}`;
    if(minutes<10){
        time.innerHTML=`${hours}:0${minutes}`
    }
    else
    time.innerHTML=`${hours}:${minutes}`
    
    }
// const getAp=()=>{
    
// }
const updateWeather=(x)=>{
    const icon=document.querySelector(".icony")
    if(x=="Clear" || x=="Sunny"){
        icon.classList.add("fa-sun");
    }
    else if(x=="Clouds" || x=="Cloudy" ||x=="Partly Cloudy"|| x=="Haze" || x=="Cloud" || x=="Overcast"){
        icon.classList.add("fa-cloud");
    }
}
const rem=()=>{
    message.classList.remove("hidden")
    message.innerHTML="Please enter a valid city name";
            weather_all.classList.add("hidden");
}
let cityname=" ";
const mainOper=async()=>{
    cityname=input.value;
    if(cityname=="" || input.value.length==0 ||input.value.isNaN==false){
        message.classList.remove("hidden")
        weather_all.classList.add("hidden");
        message.innerHTML="Please enter the city name first"
    }
    else{
        // cityname=input.value;
        try{
            cityname=input.value;
            const apiData=await fetch(`https://api.weatherapi.com/v1/current.json?key=aaf471feeaf0429d957121714222306&q=${cityname}&aqi=no`)
            const secData=await apiData.json()
            check=true;
            const weat=secData.current.condition.text;
            updateTimeDate();
            updateWeather(weat);
            message.classList.add("hidden");
            weather_all.classList.remove("hidden");
            city.innerHTML=`${secData.location.name} , ${secData.location.country}`
            temp.innerHTML=`${secData.current.temp_c}`
            speed.innerHTML=`Wind: ${secData.current.wind_kph}  kph`
            fahren.innerHTML=`Fahrenheight: ${secData.current.temp_f} F`
            //secData.current.condition.text=="clear"
        }

        catch{
            return rem();
        }
    }
}
submit.addEventListener("click",(event)=>{
    event.preventDefault();
    mainOper();
})




