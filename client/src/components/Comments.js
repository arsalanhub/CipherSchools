import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Comments({ commentData, getUserName, likeData }) {
  const [countLikes, setCountLikes]=useState(0);
  const [likeColor, setLikeColor]=useState(false);

  useEffect(() => {
    let userId=JSON.parse(localStorage.getItem("userData")).user._id;
    if(likeData) {
        let tmpLikes=0, tmpLikeColor=false;
        for(let idx in likeData) {
            if(likeData[idx].likes) tmpLikes++;
            if(likeData[idx].likes && likeData[idx].userId===userId) tmpLikeColor=true;
        }
        console.log(tmpLikeColor)
        setCountLikes(tmpLikes);
        setLikeColor(tmpLikeColor);
    }
  }, [likeData])
  return (
    <>
      <div style={{ marginBottom: "1rem" }}>Comments</div>
      {commentData &&
        commentData.map((data) => {
          return (
            <>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <Avatar sx={{ bgcolor: "purple" }}>OP</Avatar>{" "}
                <div style={{ display: "flex", alignItems: "center" }}>{getUserName(data.userId)}</div>
              </div>
              <div style={{ marginLeft: "2.75rem" }}>{data.comments}</div>
            </>
          );
        })}
        <div className="commentsSectionBottomWrapper">
            <FavoriteIcon style={{ cursor: "pointer", color: likeColor ? "red" : "gray" }} />
            <div>{countLikes} Likes</div>
            <div style={{ display: "flex", gap: "0.25rem", marginLeft: "1rem", width: "80%" }}>
                <input type="text" placeholder="Type Comment Here..." style={{ width: "70%" }} />
                <button>Add Comment</button>
            </div>
        </div>
    </>
  );
}
