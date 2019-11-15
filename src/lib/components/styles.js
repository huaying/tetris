import styled from "styled-components";

const Board = styled.div`
  position: relative;
  width: fit-content;
`;

const Row = styled.div`
  display: flex;
  & + & {
    border-top: none;
  }
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
`;

const Unit = styled.div`
  & + & {
    border-left: none;
  }
  width: 25px;
  height: 25px;
  border-right: 1px solid #efefef;
  border-left: 1px solid #efefef;
  background: ${props =>
    ({
      cube: "#7e7eff",
      stick: "#ff4444",
      tshape: "#ffd17e",
      lshape: "#49cc49",
      "lshape-r": "#ab3cab",
      lighting: "#a2a2a2",
      "lighting-r": "lightsalmon",
      empty: "#fafafa",
      shadow: "rgba(0, 0, 0, 0.08)"
    }[props.type])};
  ${props =>
    props.type !== "empty" &&
    "box-shadow: inset 0px 0px 5px 1px rgba(255, 255, 255, 0.5);"};
`;

const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  background: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 100%;
`;

export { Board, Panel, Row, Unit };
