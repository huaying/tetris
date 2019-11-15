export const NUM_ROW = 20;
export const NUM_COLUMN = 10;

export const LOOP_TIME = 500;

export const EMPTY = 0;
export const CUBE = 1;
export const STICK = 2;
export const TSHAPE = 3;
export const LSHAPE = 4;
export const LSHAPE_R = 5;
export const LIGHTING = 6;
export const LIGHTING_R = 7;
export const SHADOW = 8;

export const GAME_STATUS = {
  INIT: 0,
  PLAYING: 1,
  GAMEOVER: 2
};

export const DIR = {
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1]
};

export const DEG = {
  ZERO: 0,
  NIGHTY: 1,
  REVERSE: 2,
  REVERSE_NIGHTY: 3
};

export const PIECE = {
  [CUBE]: {
    shape: {
      [DEG.ZERO]: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
      ],
      [DEG.NIGHTY]: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
      ],
      [DEG.REVERSE]: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
      ],
      [DEG.REVERSE_NIGHTY]: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
      ]
    },
    name: "cube"
  },
  [STICK]: {
    shape: {
      [DEG.ZERO]: [
        [0, -1],
        [0, 0],
        [0, 1],
        [0, 2]
      ],
      [DEG.NIGHTY]: [
        [-2, 0],
        [-1, 0],
        [0, 0],
        [1, 0]
      ],
      [DEG.REVERSE]: [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [-1, 2]
      ],
      [DEG.REVERSE_NIGHTY]: [
        [-2, 1],
        [-1, 1],
        [0, 1],
        [1, 1]
      ]
    },
    name: "stick"
  },
  [TSHAPE]: {
    shape: {
      [DEG.ZERO]: [
        [1, 0],
        [1, -1],
        [1, 1],
        [0, 0]
      ],
      [DEG.NIGHTY]: [
        [1, 0],
        [2, 0],
        [1, 1],
        [0, 0]
      ],
      [DEG.REVERSE]: [
        [1, 0],
        [1, -1],
        [1, 1],
        [2, 0]
      ],
      [DEG.REVERSE_NIGHTY]: [
        [1, 0],
        [2, 0],
        [1, -1],
        [0, 0]
      ]
    },
    name: "tshape"
  },
  [LSHAPE]: {
    shape: {
      [DEG.ZERO]: [
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1]
      ],
      [DEG.NIGHTY]: [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1]
      ],
      [DEG.REVERSE]: [
        [1, 0],
        [1, -1],
        [1, 1],
        [2, 1]
      ],
      [DEG.REVERSE_NIGHTY]: [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, -1]
      ]
    },
    name: "lshape"
  },
  [LSHAPE_R]: {
    shape: {
      [DEG.ZERO]: [
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1]
      ],
      [DEG.NIGHTY]: [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1]
      ],
      [DEG.REVERSE]: [
        [1, 0],
        [1, -1],
        [1, 1],
        [2, -1]
      ],
      [DEG.REVERSE_NIGHTY]: [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, -1]
      ]
    },
    name: "lshape-r"
  },
  [LIGHTING]: {
    shape: {
      [DEG.ZERO]: [
        [0, -1],
        [0, 0],
        [1, 0],
        [1, 1]
      ],
      [DEG.NIGHTY]: [
        [0, 0],
        [0, 1],
        [1, 0],
        [-1, 1]
      ],
      [DEG.REVERSE]: [
        [0, -1],
        [0, 0],
        [1, 0],
        [1, 1]
      ],
      [DEG.REVERSE_NIGHTY]: [
        [0, 0],
        [0, 1],
        [1, 0],
        [-1, 1]
      ]
    },
    name: "lighting"
  },
  [LIGHTING_R]: {
    shape: {
      [DEG.ZERO]: [
        [0, 1],
        [0, 0],
        [1, 0],
        [1, -1]
      ],
      [DEG.NIGHTY]: [
        [0, 0],
        [0, -1],
        [1, 0],
        [-1, -1]
      ],
      [DEG.REVERSE]: [
        [0, 1],
        [0, 0],
        [1, 0],
        [1, -1]
      ],
      [DEG.REVERSE_NIGHTY]: [
        [0, 0],
        [0, -1],
        [1, 0],
        [-1, -1]
      ]
    },
    name: "lighting-r"
  }
};

export const BLOCK = {
  ...PIECE,
  [EMPTY]: {
    name: "empty"
  },
  [SHADOW]: {
    name: "shadow"
  }
};
