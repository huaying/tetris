import React from "react";

import Board from "./board";
import { randomItems } from "./utils";

import {
  NUM_ROW,
  NUM_COLUMN,
  EMPTY,
  SHADOW,
  DIR,
  DEG,
  PIECE,
  LOOP_TIME,
  GAME_STATUS
} from "./constants";

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = this.initState();
    window.addEventListener("keydown", this.controller);
  }

  initState() {
    return {
      status: GAME_STATUS.INIT,
      grid: Array(NUM_ROW)
        .fill(null)
        .map(e => Array(NUM_COLUMN).fill(EMPTY)),

      piece: null,
      piecePos: null,
      pieceDeg: null
    };
  }

  gameStart = () => {
    this.setState({ ...this.initState(), status: GAME_STATUS.PLAYING }, () => {
      window.clearInterval(this.timer);
      this.timer = setInterval(this.gameLoop, LOOP_TIME);
      this.placeNewPiece();
    });
  };

  gameEnd = () => {
    this.setState({ status: GAME_STATUS.GAMEOVER });
    window.clearInterval(this.timer);
  };

  controller = e => {
    const { status, piece, piecePos, pieceDeg } = this.state;
    if (status !== GAME_STATUS.PLAYING) return;

    const DIRMap = {
      37: DIR.LEFT,
      39: DIR.RIGHT,
      40: DIR.DOWN
    };

    // Key Left, Right: move
    const direction = DIRMap[e.keyCode];
    if (direction)
      if (!this.pieceEnded(piece, piecePos, pieceDeg, direction)) {
        this.updatePiece(piece, piecePos, pieceDeg, direction, () => {
          this.updateShadow(
            this.state.piece,
            this.state.piecePos,
            this.state.pieceDeg
          );
        });
      }

    // Key Up: rorate
    if (e.keyCode === 38) {
      this.rotatePiece(piece, piecePos, pieceDeg, () => {
        this.updateShadow(
          this.state.piece,
          this.state.piecePos,
          this.state.pieceDeg
        );
      });
    }

    // Key Space: drop
    if (e.keyCode === 32) {
      this.dropPiece(piece, piecePos, pieceDeg);
      this.gameLoop();
      window.clearInterval(this.timer);
      this.timer = setInterval(this.gameLoop, LOOP_TIME);
    }
  };

  gameLoop = () => {
    const { piece, piecePos, pieceDeg } = this.state;
    if (this.pieceEnded(piece, piecePos, pieceDeg, DIR.DOWN)) {
      this.lineCleanCheck();
      this.placeNewPiece();
    } else {
      this.updatePiece(piece, piecePos, pieceDeg, DIR.DOWN);
    }
  };

  lineCleanCheck = () => {
    const { grid } = this.state;
    const lines = grid.filter(
      line =>
        line.some(unit => !this.unitEmpty(unit)) &&
        !line.every(unit => !this.unitEmpty(unit))
    );
    const newGrid = Array(NUM_ROW)
      .fill(null)
      .map(e => Array(NUM_COLUMN).fill(EMPTY));

    let newGridLineIdx = NUM_ROW - 1;
    lines.reverse().forEach(line => {
      newGrid[newGridLineIdx--] = [...line];
    });

    this.setState(prevState => ({
      grid: newGrid
    }));
  };

  unitEmpty = v => v === EMPTY || v === SHADOW;

  placeNewPiece = () => {
    const piece = randomItems(Object.keys(PIECE));
    console.log(piece);
    const shift = Math.floor((NUM_COLUMN - 1) / 2);
    const { grid } = this.state;

    const positions = this.getPiecePositions(piece, [0, shift], DEG.ZERO);
    if (positions.every(([i, j]) => this.unitEmpty(grid[i][j]))) {
      this.updatePiece(piece, [0, shift], DEG.ZERO, [0, 0], () => {
        this.updateShadow(
          this.state.piece,
          this.state.piecePos,
          this.state.pieceDeg
        );
      });
    } else {
      const newGrid = [...grid];
      const backupPosistions = positions.map(([i, j]) => [i - 1, j]);
      if (!backupPosistions.some(([i, j]) => i >= 0 && grid[i][j] !== EMPTY)) {
        backupPosistions.forEach(([i, j]) => {
          if (i >= 0) newGrid[i][j] = piece;
        });
      }
      this.setState({ grid: newGrid });
      this.gameEnd();
    }
  };

  getPiecePositions = (piece, position, degree) => {
    return PIECE[piece].shape[degree].map(([i, j]) => [
      i + position[0],
      j + position[1]
    ]);
  };

  getTunedPositions = (piece, position, degree) => {
    let positions = null;
    let prev_pos = [];
    while (true) {
      if (prev_pos.toString() === position.toString()) break;
      prev_pos = [...position];
      positions = this.getPiecePositions(piece, position, degree);
      for (let idx = 0; idx < positions.length; idx++) {
        const [i, j] = positions[idx];
        if (i < 0) position = [position[0] + 1, position[1]];
        if (i >= NUM_ROW) position = [position[0] - 1, position[1]];
        if (j < 0) position = [position[0], position[1] + 1];
        if (j >= NUM_COLUMN) position = [position[0], position[1] - 1];
      }
    }
    return [position, positions];
  };

  updateShadow = (piece, position, degree) => {
    const newGrid = [...this.state.grid];
    const positions = this.getPiecePositions(piece, position, degree);

    newGrid.forEach((row, i) =>
      row.forEach((unit, j) => {
        if (unit === SHADOW) newGrid[i][j] = EMPTY;
      })
    );

    const dist = this.getDropDist(piece, position, degree);
    positions.forEach(([i, j]) => {
      if (
        !positions.map(p => p.toString()).includes([i + dist, j].toString())
      ) {
        newGrid[i + dist][j] = SHADOW;
      }
    });

    this.setState({ grid: newGrid });
  };

  updatePiece = (piece, position, degree, direction, cb = () => {}) => {
    const [x, y] = direction;
    const newGrid = [...this.state.grid];
    const positions = this.getPiecePositions(piece, position, degree);

    positions.forEach(([i, j]) => (newGrid[i][j] = EMPTY));
    positions.forEach(([i, j]) => (newGrid[i + x][j + y] = piece));

    this.setState(
      {
        grid: newGrid,
        piece,
        pieceDeg: degree,
        piecePos: [position[0] + x, position[1] + y]
      },
      () => cb()
    );
  };

  rotatePiece = (piece, position, degree, cb = () => {}) => {
    const newGrid = [...this.state.grid];
    const nextDeg = (degree + 1) % Object.keys(DEG).length;
    const positions = this.getPiecePositions(piece, position, degree);
    const [newPosition, newPositions] = this.getTunedPositions(
      piece,
      position,
      nextDeg
    );

    if (
      !newPositions.some(
        ([i, j]) =>
          !positions.map(p => p.toString()).includes([i, j].toString()) &&
          !this.unitEmpty(newGrid[i][j])
      )
    ) {
      positions.forEach(([i, j]) => (newGrid[i][j] = EMPTY));
      newPositions.forEach(([i, j]) => (newGrid[i][j] = piece));

      this.setState(
        {
          piecePos: newPosition,
          pieceDeg: nextDeg,
          grid: newGrid
        },
        () => cb()
      );
    } else {
      cb();
    }
  };

  getDropDist = (piece, position, degree) => {
    const positions = this.getPiecePositions(piece, position, degree);
    const { grid } = this.state;
    let dist = 0;
    let next = 0;

    const shouldEnded = ([i, j]) => {
      return (
        i + next >= NUM_ROW ||
        (!positions.map(p => p.toString()).includes([i + next, j].toString()) &&
          !this.unitEmpty(grid[i + next][j]))
      );
    };

    while (true) {
      next = dist + 1;
      const end = positions.some(shouldEnded);
      if (!end) dist += 1;
      else break;
    }
    return dist;
  };

  dropPiece = (piece, position, degree) => {
    const dist = this.getDropDist(piece, position, degree);
    this.updatePiece(piece, position, degree, [dist, 0]);
  };

  pieceEnded = (piece, position, degree, direction) => {
    const [x, y] = direction;
    const { grid } = this.state;
    const positions = this.getPiecePositions(piece, position, degree);
    return positions.some(
      ([i, j]) =>
        i + x < 0 ||
        i + x >= NUM_ROW ||
        j + y < 0 ||
        j + y >= NUM_COLUMN ||
        (!positions
          .map(p => p.toString())
          .includes([i + x, j + y].toString()) &&
          !this.unitEmpty(grid[i + x][j + y]))
    );
  };

  render() {
    return (
      <>
        <Board grid={this.state.grid} gameStatus={this.state.status} />
        {this.props.children(this.gameStart)}
      </>
    );
  }
}
