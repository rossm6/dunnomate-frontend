function Shape ({ color, index, shape }) {

  let props;
  let ShapeComponent;



  if(shape === "circle"){
    ShapeComponent = "circle";
    props = {
      cx: 20 + 30 * ( index % 3 ),
      cy: 20 + 30 * ( Math.floor(index / 3) ),
      r: 10
    };
  }
  else if(shape === "square"){
    ShapeComponent = "rect";
    props = {
      x: 10 + 30 * ( index % 3 ),
      y: 10 + 30 * ( Math.floor(index / 3) ),
      width: 20,
      height: 20
    };
  }
  else if(shape === "star"){
    ShapeComponent = "polygon";
    let points = [
      {
        x: 20.5 + 30 * ( index % 3 ),
        y: 10 + 30 * ( Math.floor(index / 3) )
      },
      {
        x: 13.5 + 30 * ( index % 3 ),
        y: 29 + 30 * ( Math.floor(index / 3) )
      },
      {
        x: 30 + 30 * ( index % 3 ),
        y: 17 + 30 * ( Math.floor(index / 3) )
      },
      {
        x: 10 + 30 * ( index % 3 ),
        y: 17 + 30 * ( Math.floor(index / 3) )
      },
      {
        x: 27.5 + 30 * ( index % 3 ),
        y: 29 + 30 * ( Math.floor(index / 3) )
      }
    ];
    props = {points: points.map(point => `${point.x},${point.y}`).join(" ")}
  }


  return <ShapeComponent fill={color} {...props} />

}


function Tile ({ background, formation, shape, color }) {

  return (
    <svg viewBox="0 0 100 100" style={{ background, borderRadius: 5 }}>
      {
        formation.split("").map((item, index) => (
          item === "1" ? <Shape color={color} shape={shape} index={index} key={index} /> : null
        ))
      }
    </svg>
  );

}

Tile.defaultProps = {
  formation: "000010000"
};

export default Tile;
