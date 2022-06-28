import React, { Fragment, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Add_match() {
  const [teamOne, setteamOne] = useState("");
  const [teamTwo, setteamTwo] = useState("");
  const [eventName, seteventName] = useState("");
  const [eventDate, seteventDate] = useState("");
  const [imageOne, setimageOne] = useState("");
  const [imageTwo, setimageTwo] = useState("");
  const connected_user=JSON.parse(localStorage.getItem("connected_user"))
  let navigate=useNavigate()

const onChangeImageOne=(event)=>{
    const file = event.target.files[0];
    setimageOne(file)
}

const onChangeImageTwo=(event)=>{
    const file = event.target.files[0];
    setimageTwo(file)
}

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("imageOne", imageOne);
    formData.append("imageTwo", imageTwo);
    formData.append("teamOne", teamOne);
    formData.append("teamTwo", teamTwo);
    formData.append("eventName", eventName);
    formData.append("eventDate", eventDate);
    formData.append("userId", connected_user.id);
    console.log(formData);

    axios
    .post("http://localhost:3200/api/add_matches", formData)
    .then((response) => {
        console.log("response ", response.data);
        navigate('/Matches')
    })
    .catch((error) => {
      console.log("error", error);
    });
  };

  return (
    <Fragment>
      <Hero title="Add Match" />
      <div className="site-section">
        <div className="container">
          <form>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="team One"
                    onChange={(e) => setteamOne(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Event name"
                    onChange={(e) => seteventName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="score One"
                    onChange={onChangeImageOne}                  />
                </div>
                <div className="form-group">
                  <input
                    type="button"
                    className="btn btn-primary py-3 px-5"
                    defaultValue="Add Match"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="team Two"
                    onChange={(e) => setteamTwo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="score Two"
                    onChange={(e) => seteventDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Image Two"
                    onChange={onChangeImageTwo}   
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
