import React from "react";
import PropTypes from "prop-types";
import { BLOCK, GAME_STATUS } from "./constants";

import { Board as StyledBoard, Panel, Row, Unit } from "./styles";

export default class Board extends React.PureComponent {
  static propTypes = {
    grid: PropTypes.array.isRequired
  };

  renderRow = rowIdx => {
    return this.props.grid[rowIdx].map(unit => {
      return <Unit type={BLOCK[unit].name} />;
    });
  };

  renderPanel = () => {
    if (this.props.gameStatus !== GAME_STATUS.GAMEOVER) return null;
    return <Panel>Game Over</Panel>;
  };

  render() {
    return (
      <StyledBoard>
        {this.renderPanel()}
        {this.props.grid.map((row, rowIdx) => (
          <Row>{this.renderRow(rowIdx)}</Row>
        ))}
      </StyledBoard>
    );
  }
}
