import React, { useEffect, useState } from 'react'
import UploadVideo from '../components/UploadVideo'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import "../../src/App.css"

export default function Dashboard() {
    const [videoData, setVideoData]=useState({});
    const [userData, setUserData]=useState({});
    const [allUsersData, setAllUsersData]=useState({});
    
    const navigate=useNavigate();
    const getUserName = (userId) => {
        for(let idx in allUsersData) {
            if(allUsersData[idx]._id===userId) return allUsersData[idx].name;
        }
    }
    const getData = async () => {
        let userData=JSON.parse(localStorage.getItem("userData"));
        setUserData(userData);
        let token=userData.auth;
        let { data } = await axios.get("http://localhost:5000/dashboard", {
          headers: {
            "Authorization": token
          },
        });
        setVideoData(data.data);
        
        let allUsers = await axios.get("http://localhost:5000/allusers", {
            headers: {
                "Authorization": token
            },
        })
        console.log(allUsers.data.data)
        setAllUsersData(allUsers.data.data);
    }
    const logoutHandler = () => {
        localStorage.removeItem("userData");
        navigate("/");
    }
    useEffect(() => {
        getData();
    }, [])
  return (
    <>
      <UploadVideo setVideoData={setVideoData} />
      <div>Welcome {userData.user && userData.user.name} <button onClick={() => logoutHandler()}>Logout</button></div>
      {videoData && videoData.length && videoData.map((data, idx) => {
        return (
            <div className='videoWrapper'>
                <div style={{display: "flex", gap: "0.5rem", backgroundColor: "white", borderRadius: "1.5rem" }}>
                    <Avatar sx={{ bgcolor: "purple" }}>OP</Avatar> 
                    <div style={{ display: "flex", alignItems: "center" }}>{getUserName(data.userId)}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <video src={data.Url} key={data._id} height="350" width="600" controls style={{ borderRadius: "1.5rem" }}></video>
                    <div style={{ backgroundColor: "white", marginTop: "0.25rem", width: "70%", borderRadius: "1.5rem", padding: "0.5rem" }}>Comments Section</div>
                </div>
            </div>
        )
      })}
    </>
  )
}
