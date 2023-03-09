import axios from "axios"
import react, { useEffect, useState } from "react"

function App() {
  const [file, setFile]=useState("")
  const fun = async () => {
    var formData = new FormData();
    formData.append("video", file);
    formData.append("userId", "640a1ca21e8fb14d8708f2d4");
    await axios.post("http://localhost:5000/uploadVideo", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  useEffect(() => {
    if(file!=="") fun();
  }, [file])
  return (
    <>
      <div>Hello</div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />  
    </>
  );
}

export default App;
