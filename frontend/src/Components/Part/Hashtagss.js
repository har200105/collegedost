import { React, useState } from "react";
import Question from "./Que";

import "./Home.css";

import "react-quill/dist/quill.snow.css";

import axios from "axios";

import { useEffect } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.css";
import land from "./assets/1.png";

import "react-awesome-slider/dist/styles.css";
import Header from "./Header.js";
import {Link, useLocation} from 'react-router-dom';
import "./Home.css";
import { API } from "./API";

export default function HashTag({match}) {

  const [posts, setPosts] = useState([]);
  const[hashTag,setHashTag]=useState([]);
  
  const getLastestHashtags=async(e)=>{
    const d = await axios.get(`${API}/topHashtags`,{
      headers:{
        Authorization:localStorage.getItem("jwt"),
      }
    });
    if(d.status===201){
      setHashTag(d.data);
    }
  }

  const {search} =  useLocation();
  console.log(search.replace("?","#"));
  const getHashTagPosts = async()=>{
    const ps = await axios.post(`${API}/getHashtags`,{
      hashtag:search.replace("?","#")
    },{
      headers:{
        "Authorization": localStorage.getItem("jwt"),
      }
    });

    console.log(ps);

  setPosts(ps.data);
  }
  useEffect(() => {
   getHashTagPosts();
   getLastestHashtags();
  }, []);
  return (
    <div className="home">
    <div >
    <Header />
    <div className="landing">
      <img
        className="landing-img"
        src={land}
        style={{
          height: "33%",
          width: "33%",
          marginTop: "10px",
          float: "left",
          marginLeft: "20px",
        }}
        alt=""
      />
      <div className="landing-line">Get your questions answered...</div>
    </div>
   
    <div className="sec-nav">
    { 
      hashTag.map(h=>(

        <div class="secnav-items one1">
        <Link  to ={`/hashtag/?${h.hashTagtext.replace("#","")}`}>{h.hashTagtext}</Link>
        </div>
      ))
    }
      
      <div className="secnav-items add-Question">
      </div>
    </div>
    </div>
    <div className="content">
      <div className="sidebar">
        
      </div>
      <div className="feed">
        {posts.map((p) => (
          <Question
            description={p.body}
            hasbeenCommented={p.hasBeenCommented}
            comments={p.comments.map((x)=>(
              <div>
              <p style={{
                fontWeight:"bold"
              }}>{x.commentedBy.name}</p>
              <p>{x.text}</p>
              </div>
            ))}
            id={p._id}
            setPosts={setPosts}
            posts={posts}
            likes={p.likes}
            dislikes={p.dislikes}
            postedBy={p.postedBy}
          />
        ))}
      </div>
      <div className="ad sidebar2">
        
      </div>
    </div>
    </div>
  );
}
