import React, { useState } from "react";
import { Rnd } from "react-rnd";


export default function Pitch(props) {
  const { items } = props;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(90);
  const [height, setHeight] = useState(50);

  const onDragStop = (e, d) => {
    setX(d.x * 100);
    setY(d.y * 100);
  };

  const onResize = (e, direction, ref, delta, position) => {
    setWidth(ref.offsetWidth * 100);
    setHeight(ref.offsetHeight * 100);
  };

  return (
    <div>
      {console.log("items", items)}
      <Rnd
        bounds=".Main_pitch"
        default={{
          x: x,
          y: y,
          width: 90,
          height: 50,
        }}
        onDragStop={(e, d) => onDragStop(e, d)}
        onResize={(e, direction, ref, delta, position) =>
          onResize(e, direction, ref, delta, position)
        }
      >
        <div className={`PlayerCard Player${items._id}`}>
          <img
            className="Portrait"
             src={items.playerImage}
            alt={items.playerName}
          />
          <p>{items.playerName}</p>
        </div>
      </Rnd>
    </div>
  );
}
