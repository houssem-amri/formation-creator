import React, { Fragment, useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

export default function List_Matches() {
  const [Matches, setMatches] = useState([]);
  const [seriesMatches, setseriesMatches] = useState([]);
  const [optionsMatches, setoptionsMatches] = useState({});
  useEffect(() => {
    getAllMatches();
  }, []);

  const getAllMatches = () => {
    axios
      .get("http://localhost:3200/api/get_Matches")
      .then((response) => {
        console.log("fefefefef", response.data.data);
        setMatches(response.data.data);
        MatchDataChart(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const MatchDataChart = (data) => {
    let category = [];
    let series = [];
    let NewData=reformuleData(data)
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
        mode: 'dark', 
        palette: 'palette1', 
        monochrome: {
            enabled: false,
            color: '#00E396',
            shadeTo: 'dark',
            shadeIntensity: 1
        },
    },
      colors: ['#ee1e46'],
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
          text: "Matches By Email Users",
        },
      },
  
    };
    setoptionsMatches(options);
    setseriesMatches([{ name: "Match", data: series }]);

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
        eventDate: data[i].eventDate,
        eventName: data[i].eventName,
        teamOne: data[i].teamOne,
        teamTwo: data[i].teamTwo,
        email: data[i].userId.email,
        firstName: data[i].userId.firstName,
        lastName: data[i].userId.lastName,
      });
    }
    return T
  };
  return (
    <Fragment>
      <Hero title="Analyse Matches" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5">
              <div className="widget-next-match">
                <div className="widget-title">
                  <h3>Matches Chart</h3>
                </div>
                <div className="widget-body mb-3">
                <div id="chart">
                    <ReactApexChart
                      options={optionsMatches}
                      series={seriesMatches}
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
                  <h3>Matches List  <span className="float-right">Total Matches is {Matches.length}</span></h3>
                </div>
                <div className="widget-body mb-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name </th>
                        <th scope="col">User Email </th>
                        <th scope="col">Team One </th>
                        <th scope="col">Team Two</th>
                        <th scope="col">Event Name</th>
                        <th scope="col">Event Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Matches.map((match, key) => (
                        <tr key={key}>
                          <th scope="row">{key}</th>
                          <td>
                            {" "}
                            {match.userId.firstName} {match.userId.lastName}
                          </td>
                          <td> {match.userId.email}</td>
                          <td> {match.teamOne}</td>
                          <td>{match.teamTwo}</td>
                          <td>{match.eventName}</td>
                          <td>{match.eventDate}</td>
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
