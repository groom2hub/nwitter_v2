import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth.js";
import Home from "../routes/Home.js";
import Profile from "../routes/Profile.js";
import Navigation from "./Navigation.js";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    console.log(userObj)
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                    
                    {/* <Route element={ <div
                            style={{
                                maxWidth: 890,
                                width: "100%",
                                margin: "0 auto",
                                marginTop: "80",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        > */}
                            <Route exact path="/" element={ <Home userObj={userObj} /> } />,
                            <Route exact path="/profile" element={ <Profile refreshUser={refreshUser} userObj={userObj} /> } />
                        {/* </div>} /> */}
                        </>
                ) : (
                    <Route exact path="/" element={ <Auth /> } />
                )};
                {/* <Route element={ <Redirect from="*" to="/" /> } /> */}
            </Routes>
        </Router>
    )
}

export default AppRouter;
