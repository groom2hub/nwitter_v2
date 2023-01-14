import { useEffect, useState } from "react";
import AppRouter from "./Router.js";
import { authService } from "../fbase.js";

function App() {
  const [ init, setInit ] = useState(false);
  const [ userObj, setUserObj ] = useState(null);
  
  // useEffect(() => {
  //   authService.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUserObj({
  //         uid: user.uid,
  //         displayName: user.displayName,
  //         updateProfile: (args) => user.updateProfile(args),
  //       });
  //     } else {
  //       setUserObj(false);
  //     }
  //     setInit(true);
  //   });
  // }, []);


  useEffect( (e) => {
    async function fetchData(){
    if (sessionStorage.getItem("Id")) {
      const currentUserId = sessionStorage.getItem("Id");
      const response = await fetch(`http://localhost:8000/usertbl/${currentUserId}`);
      let curUser = await response.json();
      setUserObj({
        uid: curUser.user_id,
        displayName: curUser.user_displayname,
      });
    } else {
      setUserObj(false);
    }
    setInit(true);
  }
  fetchData();
  },[]);
    
  // User 정보 새로고침
  const refreshUser = async() => {
    const currentUserId = sessionStorage.getItem("Id");
    const response = await fetch(`http://localhost:8000/usertbl${currentUserId}`);
    let curUser = await response.json();
    setUserObj({
      uid: curUser.user_id,
      displayName: curUser.user_displayname,
    });
  };

  return (
    <>
     {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "initalizing..."}
     <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;