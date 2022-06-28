import React, { Fragment, useState } from "react";
import Hero from "./Hero";
import axios from "axios";

export default function Add_players() {
  const [playerName, setplayerName] = useState("");
  const [playerPost, setplayerPost] = useState("");
  const [playerImage, setplayerImage] = useState("");

  const connected_user = JSON.parse(localStorage.getItem("connected_user"));

  const onChangeImagePlayer = (event) => {
    const file = event.target.files[0];
    setplayerImage(file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("playerName", playerName);
    formData.append("playerPost", playerPost);
    formData.append("playerImage", playerImage);
    formData.append("userId", connected_user.id);

    console.log(formData);

    axios
      .post("http://localhost:3200/api/add_players", formData)
      .then((response) => {
        console.log("response ", response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Fragment>
      <Hero title="Add Player" />
      <div className="site-section">
        <div className="container">
          <form>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Player name"
                    onChange={(e) => setplayerName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Player post"
                    onChange={(e) => setplayerPost(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Player image"
                    onChange={onChangeImagePlayer}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="button"
                    className="btn btn-primary py-3 px-5"
                    defaultValue="Add Player"
                    onClick={handleSubmit}
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
