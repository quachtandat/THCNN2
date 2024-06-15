import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from "react"
import axios from 'axios'
function App() {
  //get
  const [items,setItems] = useState([
    {"id":"1","ten":"Iphone 15 Pro Max","price":"34190000","color":"Blue","hinh":"iphone-15-pro-max.jpg","chip":"Chip Apple A17 Pro 6 nhân",
    "ram":"RAM: 8 GB","dungluong":"Dung lượng: 256 GB","sau":"Camera sau: Chính 48 MP & Phụ 12 MP, 12 MP",
    "truoc":"Camera trước: 12 MP","pin":"Pin 4422 mAh, Sạc 20 W"},
    {"id":"2","ten":"Iphone 15 Pro","price":"27990000","color":"Blue","hinh":"iphone-15-pro.jpg","chip":"Chip Apple A17 Pro 6 nhân",
    "ram":"RAM: 8 GB","dungluong":"Dung lượng: 128 GB","sau":"Camera sau: Chính 48 MP & Phụ 12 MP, 12 MP",
    "truoc":"Camera trước: 12 MP","pin":"Pin 3274 mAh, Sạc 20 W"},
    {"id":"3","ten":"Iphone 15","price":"22490000","color":"Blue","hinh":"iphone-15.jpg","chip":"Chip Apple A16 Bionic",
    "ram":"RAM: 6 GB","dungluong":"Dung lượng: 128 GB","sau":"Camera sau: Chính 48 MP & Phụ 12 MP, 12 MP",
    "truoc":"Camera trước: 12 MP","pin":"Pin 3349 mAh, Sạc 20 W"}
  ])




// post
 //Tạo một state để lưu các giá trị của form
const [formValues, setFormValues] = useState({
  id: "",
  ten: "",
  price: "",
  color: "",
  hinh: "",
  chip: "",
  ram: "",
  dungluong: "",
  sau: "",
  truoc: "",
  pin: ""
});
//Tạo một hàm để xử lý sự kiện thay đổi giá trị của form
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValues({
    ...formValues,
    [name]: value
  });
};
//Tạo một hàm để xử lý sự kiện gửi form
const handleSubmit = (e) => {
  e.preventDefault();
  //Gửi yêu cầu post đến server bằng axios
  axios.post("http://localhost:3001/iphones", formValues)
    .then((response) => {
      console.log(response.data);
      //Cập nhật lại state items
      setItems([...items, response.data]);
    })
    .catch((error) => {
      console.log(error);
    });
};

  //code

useEffect(()=>{
  axios.get("http://localhost:3001/iphones")
  
        .then((response) => {
          console.log(response.data)
          //luu
          setItems(response.data)
        })
},[])



//put
//Tạo một state để lưu id của sản phẩm cần cập nhật
const [selectedId, setSelectedId] = useState(null);
//Tạo một hàm để xử lý sự kiện chọn sản phẩm cần cập nhật
const handleSelect = (id) => {
  setSelectedId(id);
  //Tìm sản phẩm có id trùng với id được chọn
  const selectedItem = items.find((item) => item.id === id);
  //Đặt lại giá trị của form bằng thông tin của sản phẩm được chọn
  setFormValues({
    ten: selectedItem.ten,
    price: selectedItem.price,
    color: selectedItem.color,
    hinh: selectedItem.hinh,
    chip: selectedItem.chip,
    ram: selectedItem.ram,
    dungluong: selectedItem.dungluong,
    sau: selectedItem.sau,
    truoc: selectedItem.truoc,
    pin: selectedItem.pin
  });
};
//Tạo một hàm để xử lý sự kiện cập nhật sản phẩm
 const handleUpdate = (e) => {
  e.preventDefault();
  //Gửi yêu cầu put đến server bằng axios
  
  axios.put('http://localhost:3001/iphones', formValues)
    .then((response) => {
      console.log(response.data);
      //Cập nhật lại state items
      setItems(items.map((item) => item.id === selectedId ? response.data : item));
    })
    .catch((error) => {
      console.log(error);
    });
};




//delete
// Tạo một hàm để gọi API xóa một chiếc iphone theo id
const handleDelete = (deleteID) => {
  
 axios.delete(`http://localhost:3001/iphones/${deleteID}`)
  .then(res => {
     console.log('DELETD RECORD::::', res.data)

  })
  .catch(err => console.log(err))
};
// search
let searchID = '';
const handleSearch = () => {
  
  axios.get(`http://localhost:3001/iphones/${searchID}`)
  .then((response) => {
    setItems(response.data)})
 };



  return (
    // get
    <div className='tong'>
      <h1>Bán iPhone</h1>
    <div className="container">
        {items.map((items)=> (
         <div className='item'>
          <img src={"./images/"+items.hinh} className='img-iphone'/>
            <ul className='item-info'>
              <li><p>{items.ten}</p></li>
              <li className='gia'><p>Price:{items.price}</p></li>
              <li><p>{items.color}</p></li>
              <li><p>{items.chip}</p></li>
              <li><p>{items.ram}</p></li>
              <li><p>{items.dungluong}</p></li>
              <li><p>{items.sau}</p></li>
              <li><p>{items.truoc}</p></li>
              <li><p>{items.pin}</p></li>
            </ul>
            <button className="btn btn-danger" onClick={() => handleDelete(items.id)}>
                                            Delete
                                        </button>
      </div>
  ))}
  </div>




{/* post */}
 <div className="form">
    <h2>Thêm sản phẩm mới</h2>
    <form onSubmit={handleSubmit}>
      <label>Mã sản phẩm:</label>
      <input type="int" name="id" value={formValues.id} onChange={handleChange} />
      <label>Tên sản phẩm:</label>
      <input type="varchar" name="ten" value={formValues.ten} onChange={handleChange} />
      <label>Giá sản phẩm:</label>
      <input type="decimal" name="price" value={formValues.price} onChange={handleChange} />
      <label>Màu sắc:</label>
      <input type="varchar" name="color" value={formValues.color} onChange={handleChange} />
      <label>Hình ảnh:</label>
      <input type="varchar" name="hinh" value={formValues.hinh} onChange={handleChange} />
      <label>Chip:</label>
      <input type="varchar" name="chip" value={formValues.chip} onChange={handleChange} />
      <label>RAM:</label>
      <input type="varchar" name="ram" value={formValues.ram} onChange={handleChange} />
      <label>Dung lượng:</label>
      <input type="varchar" name="dungluong" value={formValues.dungluong} onChange={handleChange} />
      <label>Camera sau:</label>
      <input type="varchar" name="sau" value={formValues.sau} onChange={handleChange} />
      <label>Camera trước:</label>
      <input type="varchar" name="truoc" value={formValues.truoc} onChange={handleChange} />
      <label>Pin:</label>
      <input type="varchar" name="pin" value={formValues.pin} onChange={handleChange} />
      <button type="submit">Thêm</button>
    </form>
  </div>




{/* put */}

  <div className="form">
    <h2>Cập nhật sản phẩm</h2>
    <form onSubmit={handleUpdate}>
    <label>Mã sản phẩm:</label>
      <input type="int" name="id" value={formValues.id} onChange={handleChange} />
      <label>Tên sản phẩm:</label>
      <input type="varchar" name="ten" value={formValues.ten} onChange={handleChange} />
      <label>Giá sản phẩm:</label>
      <input type="decimal" name="price" value={formValues.price} onChange={handleChange} />
      <label>Màu sắc:</label>
      <input type="varchar" name="color" value={formValues.color} onChange={handleChange} />
      <label>Hình ảnh:</label>
      <input type="varchar" name="hinh" value={formValues.hinh} onChange={handleChange} />
      <label>Chip:</label>
      <input type="varchar" name="chip" value={formValues.chip} onChange={handleChange} />
      <label>RAM:</label>
      <input type="varchar" name="ram" value={formValues.ram} onChange={handleChange} />
      <label>Dung lượng:</label>
      <input type="varchar" name="dungluong" value={formValues.dungluong} onChange={handleChange} />
      <label>Camera sau:</label>
      <input type="varchar" name="sau" value={formValues.sau} onChange={handleChange} />
      <label>Camera trước:</label>
      <input type="varchar" name="truoc" value={formValues.truoc} onChange={handleChange} />
      <label>Pin:</label>
      <input type="varchar" name="pin" value={formValues.pin} onChange={handleChange} />
      <button type="submit">Cập nhật</button>
    </form>
  </div>

  {/* search */}
  <div>
    <h1>search</h1>
   <input type ="int" onChange={(e) => searchID = e.target.value}></input>
          <button onClick={handleSearch}> search</button>
      </div>



  </div>
  
      )  }

export default App;
