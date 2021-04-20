var rq=new XMLHttpRequest();
rq.open('GET','https://restcountries.eu/rest/v2/all', true);
rq.send();
rq.onload=function() {
    var country = JSON.parse(this.response);
    for (var i in country){
        try{
            var cname=country[i].name;
            var latlong=country[i].latlng;
            if(latlong ===0) throw new Error ("Lattitude and longitude not found");
            weatherdata(cname, ...latlong);
        }
        catch(e){
            console.log("invalid coordinates"+cname+e.message);
        }
    }
}
var weatherdata= function(name,lat,lng){
    //to print lattitude and longitude
    var URL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=269921c59d8c19f69bf0ed333fdca424` ;
    var request = new XMLHttpRequest();

request.open('GET', URL,true);
request.send();
request.onload = function(){
    var data = JSON.parse(this.response);
    console.log(`${name}:${data.main.temp}`);
}
}