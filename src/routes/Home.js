import { dbService } from "../fbase.js";
import { React, useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore"
import Nweet from "../components/Nweet.js";
import NweetFactory from "../components/NweetFactory.js";

const Home = ({ userObj }) => {
  const [nweet, setnweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  
  //데이터베이스에서 불러오기
  useEffect(() => {
    // getNweets();

    // onSnapshot(collection(dbService, "sweets"), (snapshot) => { 
    //     const newArray = snapshot.docs.map((document) => ({
    //         id: document.id,
    //         ...document.data(),
    //     }));
    //     setNweets(newArray);
    // });
    
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const nextNweets = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id, ...doc.data(),
        };
      });
      setNweets(nextNweets);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {/* 트윗이 하나도 없을 경우 */}
        { nweets.length === 0
          ? <li>이 앱은 망한 앱입니다</li>
          : nweets.map((nweets) => (
            <Nweet key={nweet.id} nweetObj={nweets} isOwner={userObj} />
          ))
        }
      </div>
    </div>
  );
};

export default Home;