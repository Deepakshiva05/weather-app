import React, { useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {FcSearch} from 'react-icons/fc';
import {WiHumidity} from 'react-icons/wi'
import img1 from '../src/assets/wea1.jpg';
import img2 from '../src/assets/wea2.jpg'
import lottie from 'lottie-react'
import Lottie from 'lottie-react';
import ani from '../src/components/sun.json';
import win from '../src/components/win1.json';
import hum from '../src/components/hum.json';
import { Table,TableCell,TableRow } from '@mui/material';



const key='1ff8a3dc593ef6639f9f0a28ece05a1e';



const App = () => {

useEffect(()=>{
  hour=new Date().getHours();
  setHour(hour)
  min=new Date().getMinutes();
  setMin(min)
  var des=desc;
  setDesc(des);

})
  //for time and date
  var days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
	var months=['January','February','March','April','May','June','July','August','September','October','November','December']
	var day= new Date().getDay();
	var date =new Date().getDate();
	var year=new Date().getFullYear();
	var month=new Date().getMonth();
	var[hour,setHour]=useState('');
	var[min,setMin]=useState('');
	const[sec,setSec]=useState('');
  const[city,setCity] = useState('chennai');
  const[data,setData] = useState(city.data);

  const[temp,setTemp]=useState('23 C');

  const[desc,setDesc]=useState('Welcome User');


const fetchData = async () =>{

  try{
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
      setData(response.data);
      setDesc(data.weather[0].description)
      // setTemp(Math.round(data.main.temp-273)) 
      // setHumid(data.weather.humidity)
      // setWind(data.wind.speed)
      
  }
  catch(err){
      console.log("enter a valid input");
  }
}


  return (
    <>
    
      <div className="container-fluid text-light">
        <div className="outer-bg" >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8" id="main">
              
                <div className="top p-4" >
                <h1>{city}</h1>
               {data && <h5>{data.sys.country}</h5>}
                </div>
                <div className="desc">
                   <h1 className='text-center text-white'>"{desc}"</h1>
                </div>
                <div className="bottom d-flex justify-content-between p-4">
                
                    <div className="time">
                      <h1>{hour-12}H : {min}M</h1>
                      <p>{days[day]} {date} {months[month]} {year}</p>
                    </div>
                    {data &&
                    <div className="temp">
                      <h1>HOT<br></br>{Math.round(data.main.temp-273)}<sup>o</sup>C</h1>
                    </div>
}
                  
                </div>
    
              </div>
              <div className="col-lg-4 col-md-4 bg-dark">
                  <Lottie animationData={win} style={{height:'5cm'}}></Lottie>
                  <br />
                  <hr></hr>
                  <div className="ser-box d-flex ">
                  <input type='text'placeholder='Type City' id='search' onChange={((e)=>{setCity(e.target.value)})}></input><FcSearch onClick={fetchData} id="sericon"/>
                  </div>
                  
                  <br />
                  <hr />
                  <h3 className='text-center'>{city}</h3>
    
                  
                  <Table className='table table-striped'>
                    <TableRow>
                      <TableCell>Temperature</TableCell>
                      {data && <TableCell>{Math.round(data.main.temp-273)} C</TableCell>}
                    </TableRow>
                    <TableRow>
                      <TableCell>Humidity</TableCell>
                      {data && <TableCell>{data.main.humidity} Deg</TableCell>}
                    </TableRow>
                    <TableRow>
                      <TableCell>Wind Speed</TableCell>
                      {data && <TableCell>{data.wind.speed} Km/hr</TableCell>}
                    </TableRow>
                    <TableRow>
                      <TableCell>Visibility</TableCell>
                      {data && <TableCell>{data.visibility} mtrs</TableCell>}
                    </TableRow>
                    
                  </Table>
                  


              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
    }


export default App
