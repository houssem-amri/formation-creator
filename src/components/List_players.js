import React, { Fragment, useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

export default function List_players() {
  const [Players, setPlayers] = useState([]);
  const [seriesPlayers, setseriesPlayers] = useState([]);
  const [optionsPlayers, setoptionsPlayers] = useState({});
  useEffect(() => {
    getAllPlayers();
  }, []);

  const getAllPlayers = () => {
    axios
      .get("http://localhost:3200/api/get_Players")
      .then((response) => {
        console.log("here", response.data.data);
        setPlayers(response.data.data);
        PlayersDataChart(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const PlayersDataChart = (data) => {
    let category = [];
    let series = [];
    let NewData = reformuleData(data);
    const grouped = groupByCategorie(NewData, "email");
    for (let i = 0; i < Object.keys(grouped).length; i++) {
      category.push(Object.keys(grouped)[i]);
      series.push(Object.values(grouped)[i].length);
    }
    const options = {
      annotations: {
        points: [
          {
            x: "Bananas",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Bananas are good",
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
     
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      theme: {
        mode: "dark",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "#00E396",
          shadeTo: "dark",
          shadeIntensity: 1,
        },
      },
      colors: ["#ee1e46"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: category,
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Players By Email Users",
        },
      },
    };
    setoptionsPlayers(options);
    setseriesPlayers([{ name: "Player", data: series }]);
  };
  const groupByCategorie = (tableauObjets, propriete) => {
    return tableauObjets.reduce(function (acc, obj) {
      var array = [];
      var cle = obj[propriete];
      if (!acc[cle]) {
        acc[cle] = [];
        array[cle] = [];
      }

      acc[cle].push(obj);
      return acc;
    }, {});
  };
  const reformuleData = (data) => {
    let T = [];
    for (let i = 0; i < data.length; i++) {
      T.push({
        playerName: data[i].playerName,
        playerPost: data[i].playerPost,
        playerNumber: data[i].playerNumber,
        playerImage: data[i].playerImage,
        email: data[i].userId.email,
        firstName: data[i].userId.firstName,
        lastName: data[i].userId.lastName,
      });
    }
    return T;
  };

  return (
    <Fragment>
      <Hero title="Analyse Players" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5">
              <div className="widget-next-match">
                <div className="widget-title">
                  <h3>Players Chart</h3>
                </div>
                <div className="widget-body mb-3">
                  <div id="chart">
                    <ReactApexChart
                      options={optionsPlayers}
                      series={seriesPlayers}
                      type="bar"
                      height={350}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="widget-next-match">
                <div className="widget-title">
                  <h3>Players List <span className="float-right">Total Players is {Players.length}</span></h3>
                </div>
                <div className="widget-body mb-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name </th>
                        <th scope="col">User Email </th>
                        <th scope="col">Player Name</th>
                        <th scope="col">Player Post</th>
                        <th scope="col">Player Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Players.map((player, key) => (
                        <tr key={key}>
                          <th scope="row">{key}</th>
                          <td>
                            {" "}
                            {player.userId.firstName} {player.userId.lastName}
                          </td>
                          <td> {player.userId.email}</td>
                          <td>{player.playerName}</td>
                          <td>{player.playerPost}</td>
                          <td>{player?.playerNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
