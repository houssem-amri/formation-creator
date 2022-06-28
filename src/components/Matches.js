import React, { Fragment, useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Matches() {
  const connected_user = JSON.parse(localStorage.getItem("connected_user"));
  const [Matches, setMatches] = useState([]);
let navigate=useNavigate()
  useEffect(() => {
    getAllMatches();
  }, []);

  const getAllMatches = () => {
    axios
      .get("http://localhost:3200/api/matches_by_userId/" + connected_user.id)
      .then((response) => {
        setMatches(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const deleteMatches=(id)=>{
    axios
    .delete("http://localhost:3200/api/matches/" + id)
    .then((response) => {
      getAllMatches()
    })
    .catch((error) => {
      console.log("error", error);
    });
  }

  

  return (
    <Fragment>
      <Hero title="Matches" />
      <div className="site-section bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 title-section">
              <h2 className="heading">Upcoming Match</h2>
            </div>
            {Matches.map((match, key) => (
              <div className="col-lg-6 mb-4" key={key}>
                <div className="bg-light p-4 rounded">
                  <div className="widget-body">
                    <div className="widget-vs">
                      <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                        <div className="team-1 text-center">
                          <img src={match.imageOne} alt="Image" />
                          <h3>{match.teamOne}</h3>
                        </div>
                        <div>
                          <span className="vs">
                            <span>VS</span>
                          </span>
                        </div>
                        <div className="team-2 text-center">
                          <img src={match.imageTwo} alt="Image" />
                          <h3>{match.teamTwo}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center widget-vs-contents mb-4">
                    <h4>{match.eventName}</h4>
                    <p className="mb-5">
                      <span className="d-block">{match.eventDate}</span>

                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                    <div className="team-1 text-center">
                      <button className="btn btn-info" onClick={()=>navigate("/Edit_match" + match._id)}>edit</button>
                    </div>
                    <div>
                      <button className="btn btn-success" onClick={()=>navigate("/Main_pitch" + match._id)} >Formation</button>
                    </div>
                    <div className="team-2 text-center">
                      <button className="btn btn-danger" onClick={()=>deleteMatches(match._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          
          </div>
        </div>
      </div>
    </Fragment>
  );
}
