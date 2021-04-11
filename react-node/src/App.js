import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [input,setInput] = useState("");
    const [data,setData] = useState([]);
    const [is_loading,setLoading]=useState(true);
    useEffect(()=>{
      setTimeout(() => {
        //api call get using axios
       // You don't need to call .json() on an axios response.
       // It is already parsed. You can get the value of response body from response.data.
        // axios.get("http://localhost:8000/demo")
        // .then((response)=> {
        // console.log(response.data)
        //   setLoading(false);
        //   setData(response.data);
        // })
        // .catch((err)=>console.log(err))
        /* -------------when response is accepted using axios use response.data to get
                        In-case of fetch we just have to use response by default;
        --------------- */

        // using fetch get
        fetch('http://localhost:8000/demo')
        .then(response=> response.json())
        .then((response)=> {
          //console.log(response)
            setLoading(false);
            setData(response);
          })
          .catch((err)=>console.log(err))

      }, 3000);
    },[]);
  
  function onChange(event)
  {
      setInput(event.target.value);
  }
  function saveData()
  {
    let temp = [...data,input];
    setData(temp);
    setInput('');

    //post req
    //1.) Using Axios
    // let body={
    //         val:input
    // }
    // axios.post("http://localhost:8000/demo",body)
    // .then(function(response){
    //     console.log(response.data);
    // })
    // .catch(function(err){
    //   console.log(err);
    // })
     
      
    //2.)Using fetch 
    let dataBody = {val:input}
      fetch('http://localhost:8000/demo',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(dataBody)
      })
      .then(response => response.text()) //.then(response => response.json())----> for JSON;---.then(response => response.text())---> for accepting a string;
      .then(data=> console.log('Successful:',data))
      .catch(err=>console.log(err))
  }
  
  return (
    <div>
      <div>
        <input type="text" placeholder="Enter Something" onChange={onChange} value={input}/>
        <button onClick={saveData}>Save</button>
      </div>
         {
           is_loading ? <h1>Loading...</h1>
           :
        <ul>
              {
                data.map((item,i)=>{
                    return <li key={i}>{item}</li>
                })
              }
        </ul>
          }
          </div>
  );
}

export default App;
