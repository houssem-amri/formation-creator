import React, { Fragment, useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit_players() {
  const [playerName, setplayerName] = useState("");
  const [playerPost, setplayerPost] = useState("");
  const [playerImage, setplayerImage] = useState("");
  const [playerNumber, setplayerNumber] = useState("");

  const connected_user = JSON.parse(localStorage.getItem("connected_user"));
  let { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    getPlayerById();
  }, []);

  const getPlayerById = () => {
    axios
      .get("http://localhost:3200/api/players_by_id/" + id)
      .then((response) => {
        let player = response.data.player;
        setplayerName(player.playerName);
        setplayerPost(player.playerPost);
        setplayerImage(player.playerImage);
        setplayerNumber(player.playerNumber);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onChangeImagePlayer = (event) => {
    const file = event.target.files[0];
    setplayerImage(file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("playerName", playerName);
    formData.append("playerPost", playerPost);
    formData.append("playerImage", playerImage);
    formData.append("playerNumber", playerNumber);
    formData.append("userId", connected_user.id);

    console.log(formData);

    axios
      .put("http://localhost:3200/api/players/"+id, formData)
      .then((response) => {
        console.log("response edit player ", response.data);
        navigate("/Players")
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Fragment>
      <Hero title="Edit Player" />
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
                    value={playerName || ""}
                    onChange={(e) => setplayerName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Player post"
                    value={playerPost || ""}
                    onChange={(e) => setplayerPost(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Player post"
                    onChange={(e) => setplayerNumber(e.target.value)}
                    value={playerNumber || ""}

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
                    defaultValue="Edit Player"
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
