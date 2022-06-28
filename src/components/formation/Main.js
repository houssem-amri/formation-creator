import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  createRef,
} from "react";
import Hero from "../Hero";
import Pitch from "./Pitch";
import pitch from "./Pitch.png";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { toPng } from "html-to-image";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Main() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const ref = useRef(null);
  const connected_user = JSON.parse(localStorage.getItem("connected_user"));
  const [Players, setPlayers] = useState([]);
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
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);



 

  return (
    <div className="Pitch_main_bc">
      <Hero title="Formation Creator" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="form-group">
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="demo-multiple-chip-label">Players</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {console.log("selected", selected)}
                        {selected.map((value) => (
                          <Chip
                            key={value._id}
                            label={value.playerName}
                            color="success"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {Players.map((player, key) => (
                      <MenuItem
                        key={key}
                        value={player}
                        style={getStyles(player, personName, theme)}
                      >
                        {player.playerName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-lg-8 Main_pitch">
              <button type="button" onClick={onButtonClick}>
                download
              </button>
              <div ref={ref}>
                  <img src={pitch} alt="pitch" className="pitch-image" />
                  {personName.map((player) => (
                    <Pitch items={player} />
                  ))}
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
