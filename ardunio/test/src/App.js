import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

const [led1Status, setLed1Status] = useState(false)
const [NhietdoStatus, setNhietdoStatus] = useState(false)
const [gioStatus, setgioStatus] = useState(false)
const [phutStatus, setphutStatus] = useState(false)
const [giothucStatus, setgiothucStatus] = useState(false)
const [phutthucStatus, setphutthucStatus] = useState(false)


const [nhietdo, setnhietdo] = useState(0)
const [gio, setgio] = useState(0)
const [phut, setphut] = useState(0)
const [giothuc, setgiothuc] = useState(0)
const [phutthuc, setphutthuc] = useState(0)

useEffect (()=> {
axios.get("http://192.168.204.187/")
.then( (response)=> {
console.log("done")})
},[])



const TurnOnOffLed01 = () => {
axios.get('http://192.168.204.187/turnOnOffLed1').then((response)=> {
console.log("done")
});
setLed1Status(!led1Status);
}

const TurnOnOffnhietdo = () => {
  axios.get(`http://192.168.204.187/turnOnOffnhietdo?nhietdo=${nhietdo}`).then((response) => {
    console.log("done");
  });
  setNhietdoStatus(!NhietdoStatus);
};

const nhapgio = () => {
  axios.get(`http://192.168.204.187/nhapgio?gio=${gio}&&phut=${phut}&&giothuc=${giothuc}&&phutthuc=${phutthuc}`).then((response) => {
    console.log("done");
  });
  setgioStatus(!gioStatus);
  setphutStatus(!phutStatus);
  setgiothucStatus(!giothucStatus);
  setphutthucStatus(!phutthucStatus);
};

 const [items,setItems] = useState([])

 useEffect(()=>{
  axios.get("http://localhost:8081/one")
  
        .then((response) => {
          console.log(response.data)
          //luu
          setItems(response.data)
        })
})

return (
<div className='App'>
<div className='container' >
<div className='row col-md-12 text-center'>
<div className='tieude'>
  <h1>SMART HOME </h1>
  <h1>QUÁCH TẤN ĐẠT - 22102167</h1> 
</div>


{items.map((items)=> (
  <div className='item'>
    <table className='item-info'>
    <tr>
    <th>Temperature</th>
    <th>Humid</th>
    <th>Hours</th>
  </tr>
      <tr>
        <th>{items.temperature}</th>
        <th>{items.humid}</th>
        <th>{items.atTime}</th>
      </tr>
    </table>
  </div>
))}



{
led1Status ?
<button type="button" className="btn btn-danger mb-2"
onClick={() => TurnOnOffLed01()} >TURN OFF LED </button>
:
<button type="button" className="btn btn-success mb-2"
onClick={() => TurnOnOffLed01()} >TURN ON LED</button>
}

<div className='nhapkhung'>
  <h2>Điều chỉnh nhiệt độ giới hạn </h2>
  <input type="number" min="0" max="100" value={nhietdo} onChange={(e) => setnhietdo(e.target.value)} placeholder="Nhiệt độ giới hạn" style= { { width: "200px" }}/>
</div>
{
NhietdoStatus ?
<button type="button" className="btn btn-danger mb-2"
onClick={() => TurnOnOffnhietdo()} >NHẬP NHẬP THÀNH CÔNG </button>
:
<button type="button" className="btn btn-success mb-2"
onClick={() => TurnOnOffnhietdo()} >NHẬP </button>
}


<div className='nhapkhung'>
  <h2>Đặt thời gian bật/tắt ĐÈN </h2>
  <p>Nhập thời gian bắt đầu</p>
  <input type="number" min="0" max="100" value={gio} onChange={(e) => setgio(e.target.value)} placeholder="Nhập giờ" style= { { width: "200px" }}/>
  <input type="number" min="0" max="100" value={phut} onChange={(e) => setphut(e.target.value)} placeholder="Nhập phút" style= { { width: "200px" }}/>
</div>
<div className='nhapkhung'>
<p>Nhập thời gian kết thúc</p>
  <input type="number" min="0" max="100" value={giothuc} onChange={(e) => setgiothuc(e.target.value)} placeholder="Nhập giờ" style= { { width: "200px" }}/>
  <input type="number" min="0" max="100" value={phutthuc} onChange={(e) => setphutthuc(e.target.value)} placeholder="Nhập phút" style= { { width: "200px" }}/>
</div>
{
gioStatus && phutStatus && giothucStatus && phutthucStatus? 

<button type="button" className="btn btn-danger mb-2"
onClick={() => nhapgio()} >NHẬP NHẬP THÀNH CÔNG </button>
:
<button type="button" className="btn btn-success mb-2"
onClick={() => nhapgio()} >NHẬP </button>
}


</div>
</div>
</div>
);
}
export default App;