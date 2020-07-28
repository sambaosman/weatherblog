/* Global Variables */
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=7b1ff229aa9f55a30ed5549371cf5aff';

document.getElementById('generate').addEventListener('click', performAction);

//function to GET WEB API data
function performAction(){
    const zipCode=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    getWeather(baseURL,zipCode,apiKey).then(function(data){
        console.log(data);
        //Add data to post request
        postData('/addData', {date:d, temp: data.main.temp, content:feelings})
        updateUI();
    });

};
const getWeather=async(baseURL,zipCode,apiKey)=>{
    const res =await fetch(baseURL+zipCode+apiKey)
    try{
        const data=await res.json();
        return data;
    }
    catch (error){
        console.log('error',error);
    }
}
//function to POST data to the server
const postData=async (url='', data={})=>{
    console.log(data);
    const response=await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
    const newData=await response.json();
    console.log(newData);
    return newData;
    }
    catch (error){
        console.log('error',error);
    }
}
//function to GET project Data
const updateUI=async()=>{
    const request=await fetch ('/allData');
    try{
        const allData=await request.json();
        document.getElementById('date').innerHTML='Date: ' +allData.date;
        document.getElementById('temp').innerHTML='Temperature: ' +allData.temp;
        document.getElementById('content').innerHTML='Feeling: '+allData.content;
    }
    catch(error){
        console.log('error',error);
    }
}


// Create a new date instance dynamically with JS
