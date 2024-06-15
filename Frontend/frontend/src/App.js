import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from "react"
import axios from 'axios'

function App() {
  const [items,setItems] = useState([
  {"id":"1","ten":"Iphone X","price":"30000000","color":"trang","hinh":"iphoneX.jpg","icon":"icon1.jpg"},
  {"id":"1","ten":"Iphone 13","price":"50000000","color":"trang","hinh":"iphone13.jpg","icon":"icon2.jpg"}
])

//code
/*
useEffect(()=>{
  axios.get("http://localhost:3000/products")
        .then((response) => {
          console.log(response.data)
          //luu
          setItems(response.data)
        })
})*/
  return (
    <div className="App">
      <div className = "myapp">
        <h3 className= 'title'>DIENTHOAI</h3>
        {items.map((item)=> (
         <div className='box'>
            <img src={"./images/"+item.icon} className='img-icone'/>
            <ul className='iphone-name'>
              <li><p>{item.ten}</p></li>
              <li><p>{item.price}</p></li>
              <li><p>{item.color}</p></li>
            </ul>
            <p key={item.id}>{item.ten}</p>
            <img src={"./images/"+item.hinh} className='img-iphone'/>

         </div> 
         
        ))}
      </div>
       
    </div>
  );
}

export default App;
