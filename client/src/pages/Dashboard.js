import React, { useEffect, useState } from 'react'
import UploadVideo from '../components/UploadVideo'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [videoData, setVideoData]=useState({});
    const [userData, setUserData]=useState({});
    const navigate=useNavigate();
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
      <UploadVideo />
      <div>Welcome {userData.user && userData.user.name} <button onClick={() => logoutHandler()}>Logout</button></div>
      {videoData && videoData.length && videoData.map((data, idx) => {
        console.log(data.Url)
        return (
            <video src={data.Url} key={data._id} controls></video>
        )
      })}
    </>
  )
}
