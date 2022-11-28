import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { setClientToken } from "../../spotify";
import Login from "../auth/login";
import Favorites from "../favorites";
import Feed from "../feed";
import Library from "../library";
import Player from "../player";
import Trending from "../trending";
import "./home.css";
import {HiLibrary} from 'react-icons/hi';
import {HiOutlineInformationCircle} from 'react-icons/hi';
import {HiVolumeUp} from 'react-icons/hi';
import {HiHeart} from 'react-icons/hi';
import {HiLightningBolt} from 'react-icons/hi';
import { HiLogout } from "react-icons/hi";
import apiClient from "../../spotify";


export default function Home() {
  const [token, setToken] = useState("");
  const [image, setImage] = useState(
  );
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);
  
  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        {/* <Sidebar />  */}
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        

      </div>
      <footer>
        <NavLink to="/" className="iconWrapper">
          <HiLibrary className="IoLibrary" />
          Library
        </NavLink>
        <NavLink to="/feed" className="iconWrapper">
          <HiHeart className="MdSpaceDashboard" />
          Welcome
        </NavLink>
        <NavLink to="/trending" className="iconWrapper">
          <HiOutlineInformationCircle className="MdSpaceDashboard" />
          About
        </NavLink>
        <NavLink to="/player" className="iconWrapper">
          <HiVolumeUp className="MdSpaceDashboard" />
          Player
        </NavLink>
        <NavLink to="/favorites" className="iconWrapper">
          <HiLightningBolt className="MdSpaceDashboard" />
          Comingsoon
        </NavLink>
        <NavLink to="" className="iconWrapper">
          <HiLogout className="MdSpaceDashboard" />
          SignOut
        </NavLink>
      </footer>
    </Router>
  );
}