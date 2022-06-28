import React, { Fragment, useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Players() {
  const connected_user = JSON.parse(localStorage.getItem("connected_user"));
  const [Players, setPlayers] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    getAllPlayers();
  }, []);

  const getAllPlayers = () => {
    axios
      .get("http://localhost:3200/api/players_by_userId/" + connected_user.id)
      .then((response) => {
        console.log("response ", response.data);
        setPlayers(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  
  const deletePlayers=(id)=>{
    axios
    .delete("http://localhost:3200/api/players/" + id)
    .then((response) => {
      getAllPlayers()
    })
    .catch((error) => {
      console.log("error", error);
    });
  }
  return (
    <Fragment>
      <Hero title="Players" />
      <div className="container site-section">
        <div className="row">
          <div className="col-6 title-section">
            <h2 className="heading">Our Players</h2>
          </div>
        </div>
        <div className="row">
          {Players?.map((player, key) => (
            <div className="col-lg-6 mb-5" key={key}>
              <div className="custom-media d-flex">
                <div className="img mr-4">
                  <img
                    src={player.playerImage}
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
                <div className="text">
                  {/* <span className="meta">May 20, 2020</span> */}
                  <h3 className="mb-4">
                    <a href="#">{player.playerName}</a>
                  </h3>
                
                  <p>
                    <a href="#">{player.playerPost}</a>
                  </p>
                  <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                    <div className="team-1 text-center">
                      <button className="btn btn-info" onClick={()=>navigate("/Edit_player" + player._id)}>edit</button>
                    </div>
                  
                    <div className="team-2 text-center ml-3">
                      <button className="btn btn-danger" onClick={()=>deletePlayers(player._id)}>Delete</button>
                    </div>
                  </div>
                 
               
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
