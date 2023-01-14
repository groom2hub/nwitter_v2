import { dbService } from "../fbase.js";
import { React, useEffect, useState } from "react";
// import { collection, query, onSnapshot, orderBy } from "firebase/firestore"
import Nweet from "../components/Nweet.js";
import NweetFactory from "../components/NweetFactory.js";

const Home = ({ userObj }) => {
  const [nweet, setnweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  
  //데이터베이스에서 불러오기
  useEffect((e) => {
    async function fetchData(){
      const response = await fetch("http://localhost:8000/nweettbl");
      let nweettbl = await response.json();
      console.log("A", nweettbl);
      setNweets(nweettbl);
      console.log("B", nweettbl);
    }
    fetchData();
    },[]);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {/* 트윗이 하나도 없을 경우 */}
        { nweets.length === 0
          ? <li>이 앱은 망한 앱입니다</li>
          : nweets.map((nweets) => (
            <Nweet key={nweets.nweet_num} nweetObj={nweets} isOwner={userObj} />
          ))
        }
      </div>
    </div>
  );
};

export default Home;