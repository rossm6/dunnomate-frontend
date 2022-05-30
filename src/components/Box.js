import {
    border,
    color,
    flexbox,
    layout,
    position,
    space,
    grid,
    system,
    typography,
  } from "styled-system";
  import styled from "styled-components";
  
  const Box = styled.div`
    ${typography}
    ${color}
    ${space}
    ${layout}
    ${flexbox}
    ${position}
    ${border}
    ${grid}
    ${system({
      animation: {
        property: "animation",
      },
      aspectRatio: {
        property: "aspect-ratio",
      },
      cursor: {
        property: "cursor",
      },
      backgroundImage: {
        property: "backgroundImage",
      },
      boxShadow: {
        property: "boxShadow",
      },
      listStylePosition: {
        property: "list-style-position",
      },
      outlineColor: {
        property: "outline-color",
      },
      outlineOffset: {
        property: "outline-offset",
      },
      outlineStyle: {
        property: "outline-style",
      },
      outlineWidth: {
        property: "outline-width",
      },
      textShadow: {
        property: "text-shadow",
      },
      transform: {
        property: "transform",
      },
      transitionDuration: {
        property: "transition-duration",
      },
      transitionProperty: {
        property: "transition-property",
      },
      whiteSpace: {
        property: "white-space",
      },
    })}
  `;
  
  Box.defaultProps = {
    hoverRollover: false,
  };
  
  export default Box;